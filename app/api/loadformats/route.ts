
import { loadFormatsFiltred } from "./core"
var { NextResponse, NextRequest } = require('next/server')

process.env.YTDL_NO_UPDATE

export async function POST(request : Request, response : Response) {   

    var clientRequest : clientRequestLF = await request.json()    
    var serverResponse : serverResponseLF 

    return await loadFormatsFiltred(clientRequest.url).then((formats) => {
        serverResponse = {
            conditon : 'fresh',
            data : formats
        }

        return Response.json(serverResponse)
    },(err : promiseErr) => {
        serverResponse = {
            conditon : 'rotten',
            data : err
        }
        return Response.json(serverResponse)
    })
}










