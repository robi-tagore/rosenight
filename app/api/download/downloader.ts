import { RoseAndNight } from "./night";

var ytdl = require("ytdl-core");
var { createReadStream, createWriteStream } = require("fs");
var { Readable } = require("stream");
var path = require("path");

function pipeable(url: string, itag: number) {
  RoseAndNight(`
pipeable operation
@url : ${url}
@itag : ${itag}`);

  // offline vs online 
  // return createReadStream('tofly.webm')
  return ytdl(url, { quality: itag });
}

function save(stream: typeof Readable, dest: string) {
  RoseAndNight(`
save operation
@stream : ${stream}
@dest : ${dest}`);

  return new Promise((rose, night) => {
    stream
      .pipe(createWriteStream(dest))
      .on("error", (err: Error) => {
        var promErr: promiseErr = {
          boundary: "while pipping",
          err: err,
        };

        RoseAndNight(`save operation => failure ${promErr}`,promErr);

        night(promErr);
        // rose(createReadStream('audio.mp4'))
      })
      .on("finish", () => {
        RoseAndNight(`save operation => success : ${dest}`);

        rose(dest);
      });
  });
}

function download(url: string, itag: number, dest: string) {
  RoseAndNight(`
download operation
@url : ${url}
@itag : ${itag}
@dest : ${dest}`);

  return new Promise((rose, night) => {
    var stream = pipeable(url, itag);
    var absPath = dest;

    save(stream, absPath).then(
      (dest) => {
        RoseAndNight(`download operation => success : ${dest}`);

        rose(dest);
      },
      (err: promiseErr) => {
        RoseAndNight(`download operation => failure : ${err}`,err);
        night({ ...err, boundary: "while saving" });
      }
    );
  });
}

export { download };
