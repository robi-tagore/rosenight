import { readFile, readFileSync, readSync } from "fs";
import { download } from "./downloader";
import { validateTitle, aRose, clearStorageCatche } from "./utils";
import { merge } from "./merger";
import { Readable } from "stream";
import { RoseAndNight } from "./night";
 
function downloadNightEdition(nightEdition: composedFormat): Promise<string> {
  RoseAndNight(`
download night edition
@nightEdition : ${nightEdition}`);

  return new Promise((rose, night) => {
    var { title, url, ext, itag } = nightEdition;
    var uniqueNess = aRose();
    var destination = `./app/api/download/resource/${uniqueNess} ${validateTitle(
      title
    )}.${ext}`;

    download(url, itag ?? 13169, destination).then(
      // note
      () => {
        RoseAndNight(`download night edition => success : ${destination}`);

        rose(destination);
      },
      (err: promiseErr) => {
        RoseAndNight(`download night edition => failure (DED) : ${err}`);

        night({ ...err, boundary: "while downloading night edition" });
      }
    );
  });
}

function downloadRoseEdition(roseEdition: composedFormat): Promise<probPath> {
  RoseAndNight(`
download rose edition
@roseEdition : ${roseEdition}`);

  return new Promise((rose, night) => {
    var { title, url, ext } = roseEdition;

    roseEdition.media.video = roseEdition.media.video ?? {}; // note

    var videoItag = roseEdition.media.video.itag;
    var audioItag = roseEdition.media.audio.itag;

    var uniqueNess = aRose();

    var des = `./app/api/download/resource/${uniqueNess} `;

    var videoDestination = des + `video ${validateTitle(title)}.${ext}`;
    var audioDestination = des + `audio ${validateTitle(title)}.${ext}`;
    var probableOut = des + `${validateTitle(title)}.${ext}`;

    download(url, videoItag ?? 13169, videoDestination).then(() => {
      RoseAndNight(`download rose edition video => success : ${videoDestination}`);
      download(url, audioItag ?? 13169, audioDestination).then(() => {
        RoseAndNight(`download rose edition audio => success : ${videoDestination}`);
        
        var resPaths: probPath = {
          videoPath: videoDestination,
          audioPath: audioDestination,
          outPath: probableOut,
        };
        RoseAndNight(`download rose edition => success : ${resPaths}`);
        rose(resPaths);
      
      },(err : promiseErr) => {
        RoseAndNight(`download rose edition audio => failure : ${err}`);
        night({...err,boundary : 'while downloading rose video'})
      }) // note
    },(err : promiseErr) => {
      RoseAndNight(`download rose edition video => failure : ${err}`);
      night({...err,boundary : 'while downloading rose video'})
    })
  });
}

function elite(format: composedFormat): Promise<Buffer> {
  RoseAndNight(`
elite operation 
@format : ${format}`);

  return new Promise((rose, night) => {
    if (format.edition == "night") {
      RoseAndNight(`@elite type : ${format.edition}`);
      downloadNightEdition(format).then(
        (path) => {
          var content = readFileSync(path);
          clearStorageCatche([path])
          RoseAndNight(`  elite operation => success : ${'...'}`);
          rose(content);
        },
        (err: promiseErr) => {
          RoseAndNight(`  elite operation => failure (RFM) : ${err}`);
          night({
            ...err,
            boundary: "while reading night edition from machine",
          });
        }
      );
    } else if (format.edition == "rose") {
      RoseAndNight(`@elite type : ${format.edition}`);
      downloadRoseEdition(format).then(
        ({ videoPath, audioPath, outPath }) => {
          merge(audioPath, videoPath, outPath).then(
            () => {
              var content = readFileSync(outPath);
              clearStorageCatche([videoPath,audioPath,outPath])
              RoseAndNight(`  elite operation => success : ${'...'}`);
              rose(content);
            },
            (err: promiseErr) => {
              RoseAndNight(`  elite operation => failure (MGF) : ${err}`);
              night({ ...err, boundary: "while merging a rose format" });
            }
          );
        },
        (err: promiseErr) => {
          RoseAndNight(`  elite operation => failure (RFM) : ${err}`);
          night({
            ...err,
            boundary: "while reading night edition from machine",
          });
        }
      );
    }
  });
}

export { elite };
