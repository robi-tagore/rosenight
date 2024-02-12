import { createRef, useEffect, useState } from "react";
import { Loader } from "./common";

function SingleFormatUE({ data }: { data: composedFormat }) {
  var edition = data.edition;
  var mediaType = data.ext;
  var mediaSpec = data.media;
  var iris = data.iris;
  var size = "~" + data.size;

  mediaSpec.video = mediaSpec.video ?? {} // note

  var resolution = iris != "a" ? mediaSpec.video.resolution : "nothing";
  var audioBitrate = mediaSpec.audio.audioBitrate;

  var [requested, tRequested] = useState(false);
  var [downloaded, tDownloaded] = useState(false);

  var [file, tFile] = useState(undefined);

  var [requestIcon, setRequestIcon] : any = useState("⤊");
  var [downloadIcon, setDownloadIcon] : any = useState("⤸");

  var [fileLoaded, setFileLoaded] = useState(false);

  async function fetchFormat() {    
    if (!requested) {
      tRequested(true);

      var req: clientRequestDF = {
        roseFormat: data,
      };

      setRequestIcon(<Loader></Loader>);
      setDownloadIcon("⤾");

      fetch("/api/download", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((ds) => {
          setRequestIcon("✓");
          setDownloadIcon(<Loader></Loader>);

          return ds.blob();
        })
        .then((blobbed: any) => {
          setRequestIcon("✓");
          setDownloadIcon("⤋");

          tFile(blobbed);
          setFileLoaded(true);
        });
    }
  }

  function downloadFormat() {
    if (!downloaded && requested && fileLoaded) {
      tDownloaded(true);

      var tempButt = document.createElement("a");
      tempButt.href = URL.createObjectURL(file ?? new Blob());
      tempButt.download = data.rose;

      document.body.appendChild(tempButt);
      tempButt.click();
      document.body.removeChild(tempButt);
      setDownloadIcon("✓");
    }
  }

  return (
    <div className="formatUIContainer" onClick={fetchFormat}>
      <div className="spec">
        <span className="mediaType">.{mediaType} </span>
        <span className="size">{size}</span>
        <span className="audioBitrate">{audioBitrate}kbps </span>
        {resolution != "nothing" ? (
          <span className="resolution">{resolution}px </span>
        ) : (
          ""
        )}
        <span className="pv">
          {}
          {edition}{" "}
        </span>
      </div>
      <div className="actions">
        <button
          type="button"
          className="actionButton"
          onClick={fetchFormat}
        >
          {requestIcon}
        </button>
        <button
          type="button"
          className="actionButton"
          onClick={downloadFormat}
        >
          {downloadIcon}
        </button>
      </div>
    </div>
  );
}

function FormatUE({ data }: { data: composedFormat[] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "90%",
        padding: "0 0 0 10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="roseandnight">
        {data.map((d, i) => (
          <SingleFormatUE key={i} data={d}></SingleFormatUE>
        ))}
      </div>
    </div>
  );
}

export { SingleFormatUE, FormatUE };
