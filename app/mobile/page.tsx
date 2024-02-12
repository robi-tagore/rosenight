"use client";

import React, {
  ReactElement,
  SyntheticEvent,
  createRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import { FormatUE, SingleFormatUE } from "../components/formatUE";
import { render } from "react-dom";
import { Loader } from "../components/common";

const apiRoutes = {
  f: "/api/loadformats",
  d: "/api/download",
};

export default function Home() {
  var inputGui = createRef();
  var formatsGui = createRef();
  var titleGUI = createRef();

  var [leftWidth, setLeftWidth] = useState(100);

  var [roseMsg, setRoseMsg] = useState(
    <div className="impact">Search to Explore</div>
  );
  var [resultMsg, setResultMsg] = useState(<div></div>);

  function checkIfNeeded(e) {
    var url = e.target.value;
    var showableUrl = url.slice(0,13*2) + ' ...'

    if (e.key == "Enter") {
      var i = 0;

      setRoseMsg(
        <div className="">
          Loading formats of <div className="impact">"{showableUrl}"</div>
          <div className="impact">{<Loader></Loader>}</div>
        </div>
      );

      setResultMsg(<div>{}</div>);


      fetch("/api/loadformats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
        }),
      }).then(async (d) => {
        
        setLeftWidth(40);

        var fetched: serverResponseLF = await d.json();

        if (fetched.conditon == "fresh") {
          var allFormats: composedFormat[] = [
            ...fetched.data.audioFormats,
            ...fetched.data.videoFormats,
          ];
          
          setRoseMsg(
            <div>
              Loaded all available formats of
              <div className="impact">"{allFormats[0].title}"</div>
            </div>
          );

          setResultMsg(<FormatUE data={allFormats}></FormatUE>);
        } else {
          setRoseMsg(
            <div>
              Failed to load formats of
              <div className="impact">"{showableUrl}"</div>
            </div>
          );

          setResultMsg(<div className="impact">This time The Night lost The Rose</div>);

        }
      });
    }
  }

  return (
    <div className="mobcontainer">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          ref={inputGui}
          onKeyDown={checkIfNeeded}
          type="text"
          className="mobspecialInput mobinputEffect"
          placeholder="⢪"
        />
      </div>

      <div ref={titleGUI} className="mobtit">
        {roseMsg}
      </div>

      <div
        ref={formatsGui}
        className="bottom"
        style={{ width: 100 - leftWidth + "%" }}
      >
        {resultMsg}
      </div>
    </div>
  );
}
