"use strict";(()=>{var e={};e.id=298,e.ids=[298],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},7147:e=>{e.exports=require("fs")},3685:e=>{e.exports=require("http")},5687:e=>{e.exports=require("https")},3477:e=>{e.exports=require("querystring")},2781:e=>{e.exports=require("stream")},1576:e=>{e.exports=require("string_decoder")},9512:e=>{e.exports=require("timers")},6144:e=>{e.exports=require("vm")},6198:(e,i,t)=>{t.r(i),t.d(i,{headerHooks:()=>y,originalPathname:()=>Q,patchFetch:()=>q,requestAsyncStorage:()=>g,routeModule:()=>p,serverHooks:()=>x,staticGenerationAsyncStorage:()=>f,staticGenerationBailout:()=>C});var a={};t.r(a),t.d(a,{POST:()=>c});var o=t(5419),r=t(9108),d=t(9678);function u(e){var i=0;return e.forEach(e=>{i+=Number(e)}),String(i/1e6).split(".")[0]+"mb"}function s(e,i="  "){var t=e;return["/","\\",":","*","?",'"',"<",">","|",":"].forEach(t=>{e=e.replaceAll(t,i)}),console.log(`
    validated title => 
    @from : ${t}
    @to : ${e}
    `),e}t(7147);var n=t(6822),{videoInfo:l}=t(6822);async function h(e){return new Promise((i,t)=>{(function({url:e}){return new Promise((i,t)=>{n.getInfo(e).then(t=>{i({vidTitle:t.videoDetails.title,url:e,formats:t.formats})},e=>{t({boundary:"while loading formats",err:e})})})})({url:e}).then(e=>{var t,a,o,r,d=(t=e.vidTitle,a=e.url,o=e.formats.map(e=>({url:a,title:t,itag:e.itag,hasAudio:e.hasAudio,hasVideo:e.hasVideo,ext:e.container,size:e.contentLength,audioBitrate:e.audioBitrate,audioCodec:e.audioCodec,height:e.height,width:e.width,videoCodec:e.videoCodec})).map(e=>({...e,have:e.hasAudio&&e.hasVideo?"a + v":e.hasAudio?"a":"v"})).map(e=>({...e,mediaQuality:"a"==e.have?{audioCodec:e.audioCodec,audioBitrate:e.audioBitrate}:"a + v"==e.have?{audioCodec:e.audioCodec,audioBitrate:e.audioBitrate,videoCodec:e.videoCodec,resolution:e.width+"x"+e.height}:{videoCodec:e.videoCodec,resolution:e.width+"x"+e.height}})).map(e=>({url:e.url,title:e.title,itag:e.itag,have:e.have,ext:e.ext,size:e.size,mediaQuality:e.mediaQuality})),r=[],o.forEach(e=>{o.forEach(i=>{"a + v"!=e.have&&"a + v"!=i.have&&e.ext==i.ext&&e.have!=i.have&&r.push({url:e.url,title:e.title,ext:e.ext,edition:"rose",iris:"v",rose:s(e.title)+"."+e.ext,size:u([e.size,i.size]),media:{video:"v"==e.have?{...e.mediaQuality,itag:e.itag}:{...i.mediaQuality,itag:i.itag},audio:"a"==e.have?{...e.mediaQuality,itag:e.itag}:{...i.mediaQuality,itag:i.itag}}})})}),o.filter(e=>"a + v"==e.have).forEach(e=>{r.push({url:e.url,title:e.title,ext:e.ext,edition:"night",itag:e.itag,iris:"v",rose:s(e.title)+"."+e.ext,size:u([e.size]),media:{video:{resolution:e.mediaQuality.resolution,videoCodec:e.mediaQuality.videoCodec},audio:{audioBitrate:e.mediaQuality.audioBitrate,audioCodec:e.mediaQuality.videoCodec}}})}),o.filter(e=>"a"==e.have).forEach(e=>{r.push({url:e.url,title:e.title,ext:e.ext,edition:"night",iris:"a",rose:s(e.title)+"."+e.ext,size:u([e.size]),itag:e.itag,media:{audio:{audioBitrate:e.mediaQuality.audioBitrate,audioCodec:e.mediaQuality.videoCodec}}})}),r);i({audioFormats:d.filter(e=>void 0==e.media.video),videoFormats:d.filter(e=>void 0!=e.media.video)})},e=>{t({boundary:"format loading",err:e})})})}var{NextResponse:v,NextRequest:m}=t(406);async function c(e,i){var t,a=await e.json();return await h(a.url).then(e=>(t={conditon:"fresh",data:e},Response.json(t)),e=>(t={conditon:"rotten",data:e},Response.json(t)))}process.env.YTDL_NO_UPDATE;let p=new o.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/loadformats/route",pathname:"/api/loadformats",filename:"route",bundlePath:"app/api/loadformats/route"},resolvedPagePath:"/home/fatema-al-zohora/rose/rose/app/api/loadformats/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:g,staticGenerationAsyncStorage:f,serverHooks:x,headerHooks:y,staticGenerationBailout:C}=p,Q="/api/loadformats/route";function q(){return(0,d.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:f})}}};var i=require("../../../webpack-runtime.js");i.C(e);var t=e=>i(i.s=e),a=i.X(0,[638,194],()=>t(6198));module.exports=a})();