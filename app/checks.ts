

// var { spawn } = require("child_process");
// var ffmpegPath = require("ffmpeg-static");
// var path = require('path')

// function merge(audPath: string, vidPath: string, dest: string) {
//   return new Promise((rose, night) => {
//     var mergingProcess = spawn(ffmpegPath as string, [
//       "-i",path.resolve(__dirname,audPath),
//       "-i",path.resolve(__dirname,vidPath),
//       "-c","copy",
//       "-y",path.resolve(__dirname,dest),
//     ]);

//     mergingProcess.stderr.on("data",(d : Buffer) => {
//       console.log(d.toString());
//     })

//     mergingProcess
//       .on("error", (err : Error) => {
//         var promErr = {
//           boundary: "while merging external",
//           err: err,
//         };
//         night(promErr);
//       })
//       .on("close", (code : number) => {
//         if (code == 0) {
//           rose(dest);
//         } else {
//           var promErr = {
//             boundary: "while merging internal",
//             err: Error(`${code}`),
//           };
//           night(promErr);
//         }
//       });
//   });
// }


// (async () => {
//   merge('stream1.mp4','stream2.mp4','rose.mp4').catch((e) => console.log(e)
//   )
// })()
