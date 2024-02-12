
import { readFileSync } from "fs";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request : typeof NextRequest, response : typeof NextResponse) {   
    
    var file = readFileSync('tofly.webm')

    var serverResponse = new Response(file)

    return serverResponse
    
}

