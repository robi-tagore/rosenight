import { RoseAndNight } from "./night";

var { spawn } = require("child_process");
var path = require('path')

var ffmpegPathExe = path.join(process.cwd(),'node_modules','ffmpeg-static','ffmpeg')

function merge(audPath: string, vidPath: string, dest: string) {
  RoseAndNight(`
merge operation
@audPath : ${audPath}
@vidPath : ${vidPath}
@dest : ${dest}`);

  return new Promise((rose, night) => {
    // var mergingProcess = spawn(ffmpegPath, [
    var mergingProcess = spawn(ffmpegPathExe, [
      "-i",audPath,
      "-i",vidPath,
      "-c","copy",
      "-y",dest,
    ]);


    mergingProcess.stderr.on("data",(d : any) => {
      console.log(d.toString());
    })

    mergingProcess
      .on("error", (err : Error) => {
        var promErr: promiseErr = {
          boundary: "while merging external",
          err: err,
        };

        RoseAndNight(`merge operation => failure FFMPEG_ERR: ${promErr}`);

        night(promErr);
      })
      .on("close", (code : number) => {
        if (code == 0) {
          RoseAndNight(`download operation => success : ${dest}`);

          rose(dest);
        } else {
          var promErr: promiseErr = {
            boundary: "while merging internal",
            err: Error(`${code}`),
          };
          RoseAndNight(`merge operation => failure FFMPEG_END : ${promErr}`);
          
          night(promErr);
        }
      });
  });
}

export {
  merge
}