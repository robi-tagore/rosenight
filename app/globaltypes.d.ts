import { videoFormat } from "ytdl-core";

declare global {
  interface formatSpec {
    url: string;
  }

  interface serverFetched {
    vidTitle: string;
    url: string;
    formats: videoFormat[];
  }

  interface composedFormat {
    url: string;
    title: string;
    ext: ext;
    edition: "night" | "rose";
    iris : 'a' | 'v';
    rose : string;
    size : string;
    itag?: number; 
    media: {
      audio: {
        itag? : number;
        audioBitrate? : number | undefined | null;
        audioCodec? : string | undefined | null;
      };
      video?: {
        itag? : number;
        resolution? : string ;
        videoCodec? : string | undefined | null;
      };
    };
  }

  interface promiseErr {
    boundary: string;
    err: Error;
  }

  interface formatsFiltred {
    audioFormats : composedFormat[];
    videoFormats : composedFormat[];
  }

  interface serverResponseLF {
    conditon : "rotten" | "fresh",
    data : formatsFiltred | promiseErr
  }

  interface clientRequestLF {
    url : string,
    rose? : boolean
  }

  interface clientRequestDF {
    roseFormat : composedFormat
  }

  interface clientResponseDF {
    condition : 'fresh' | 'rotten'
    data : any
  }

  interface probPath {
    audioPath : string,
    videoPath : string,
    outPath : string
  }
}
