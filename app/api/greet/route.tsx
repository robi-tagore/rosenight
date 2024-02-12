
import { readFileSync } from "fs";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request : Request, response : Response) {   
    
    var file = readFileSync('tofly.webm')

    var serverResponse = new Response(file)

    return serverResponse
    
}

