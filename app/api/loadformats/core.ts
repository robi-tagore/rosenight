var ytdl = require("ytdl-core");
var { videoInfo } = require("ytdl-core");
import { offlineResponse } from "./offlineData";
import { bitToMb, validateTitle } from "./utils";

function getAllFormats({ url }: formatSpec): Promise<serverFetched> {
  return new Promise((rose, star) => {
    ytdl.getInfo(url).then(
      (infos: typeof videoInfo) => {
        rose({
          vidTitle: infos.videoDetails.title,
          url: url,
          formats: infos.formats,
        });
      },
      (err: Error) => {
        var errorEdited: promiseErr = {
          boundary: "while loading formats",
          err: err,
        };

        // online vs offline
        star(errorEdited);
        // rose(offlineResponse);
      }
    );
  });
}

function recomposeServerFormats(serverFormat: serverFetched): composedFormat[] {
  var title = serverFormat.vidTitle;
  var url = serverFormat.url;

  var filtred = serverFormat.formats
    .map((format) => {
      return {
        url: url,
        title: title,

        itag: format.itag,
        hasAudio: format.hasAudio,
        hasVideo: format.hasVideo,
        ext: format.container,
        size: format.contentLength,

        audioBitrate: format.audioBitrate,
        audioCodec: format.audioCodec,

        height: format.height,
        width: format.width,
        videoCodec: format.videoCodec,
      };
    })
    .map((format1) => {
      return {
        ...format1,
        have:
          format1.hasAudio && format1.hasVideo
            ? "a + v"
            : format1.hasAudio
            ? "a"
            : "v",
      };
    })
    .map((format2) => {
      return {
        ...format2,
        mediaQuality:
          format2.have == "a"
            ? {
                audioCodec: format2.audioCodec,
                audioBitrate: format2.audioBitrate,
              }
            : format2.have == "a + v"
            ? {
                audioCodec: format2.audioCodec,
                audioBitrate: format2.audioBitrate,
                videoCodec: format2.videoCodec,
                resolution: format2.width + "x" + format2.height,
              }
            : // format2.have == "v"?
              {
                videoCodec: format2.videoCodec,
                resolution: format2.width + "x" + format2.height,
              },
      };
    })
    .map((format3) => {
      return {
        url: format3.url,
        title: format3.title,
        itag: format3.itag,
        have: format3.have,
        ext: format3.ext,
        size: format3.size,
        mediaQuality: format3.mediaQuality,
      };
    });

  var conjunced: composedFormat[] = [];

  filtred.forEach((f1) => {
    filtred.forEach((f2) => {
      if (f1.have != "a + v" && f2.have != "a + v") {
        if (f1.ext == f2.ext) {
          if (f1.have != f2.have) {
            conjunced.push({
              url: f1.url,
              title: f1.title,
              ext: f1.ext,
              edition: "rose",
              iris : "v",
              rose: validateTitle(f1.title) + '.' + f1.ext,
              size: bitToMb([f1.size,f2.size]),
              media: {
                video:
                  f1.have == "v"
                    ? { ...f1.mediaQuality, itag: f1.itag }
                    : { ...f2.mediaQuality, itag: f2.itag },
                audio:
                  f1.have == "a"
                    ? { ...f1.mediaQuality, itag: f1.itag }
                    : { ...f2.mediaQuality, itag: f2.itag },
              },
            });
          }
        }
      }
    });
  });

  filtred
    .filter((format) => format.have == "a + v")
    .forEach((f) => {
      conjunced.push({
        url: f.url,
        title: f.title,
        ext: f.ext,
        edition: "night",
        itag: f.itag,
        iris: 'v',
        rose: validateTitle(f.title) + '.' + f.ext,
        size: bitToMb([f.size]),
        media: {
          video: {
            resolution: f.mediaQuality.resolution,
            videoCodec: f.mediaQuality.videoCodec,
          },
          audio: {
            audioBitrate: f.mediaQuality.audioBitrate,
            audioCodec: f.mediaQuality.videoCodec,
          },
        },
      });
    });

  filtred
    .filter((format) => format.have == "a")
    .forEach((f) => {
      conjunced.push({
        url: f.url,
        title: f.title,
        ext: f.ext,
        edition: "night",
        iris: 'a',
        rose: validateTitle(f.title) + '.' + f.ext,
        size:bitToMb([f.size]),
        itag: f.itag,
        media: {
          audio: {
            audioBitrate: f.mediaQuality.audioBitrate,
            audioCodec: f.mediaQuality.videoCodec,
          },
        },
      });
    });

  return conjunced;
}

async function loadFormatsFiltred(
  url: string
): Promise<formatsFiltred | promiseErr> {
  return new Promise((rose, night) => {
    getAllFormats({
      url: url,
    }).then(
      (allFormats) => {
        var composed = recomposeServerFormats(allFormats);

        var final: formatsFiltred = {
          audioFormats: composed.filter((f) => f.media.video == undefined),
          videoFormats: composed.filter((f) => f.media.video != undefined),
        };

        rose(final);
      },
      (err) => {
        var promErr: promiseErr = {
          boundary: "format loading",
          err: err,
        };

        night(promErr);
      }
    );
  });
}

export { loadFormatsFiltred };
