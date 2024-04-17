import { RequestHandler } from "express";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = request.url;

  return NextResponse.json({
    message: "Hello from the API",
    request: requestUrl,
  });
}

export async function POST(request: Request) {
  return Response.json({
    message: "Success!",
  });
}
