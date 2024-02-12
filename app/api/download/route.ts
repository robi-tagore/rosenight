import { readFileSync } from "fs";
import { elite } from "./core";

const { NextResponse, NextRequest } = require('next/server')
const { download } = require("./downloader");
const { merge } = require("./merger");

process.env.YTDL_NO_UPDATE = 'true'

export async function POST(request : typeof NextRequest, response :typeof NextResponse) {

    var clientReq : clientRequestDF = await request.json()
    console.log(clientReq);    

    return await elite(clientReq.roseFormat).then((cont) => {
        return new Response(cont,{
            status : 200,
            statusText : 'fresh'
        })
    },(err) => {
        return new Response(err,{
            status : 200,
            statusText : 'rotten'
        })  
    })
}


