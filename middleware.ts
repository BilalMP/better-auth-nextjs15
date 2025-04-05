import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
    return NextResponse.next();
}