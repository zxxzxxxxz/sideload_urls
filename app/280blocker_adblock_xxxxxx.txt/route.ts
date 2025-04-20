import { NextResponse } from "next/server";

export async function GET() {
    const date = new Date();

    const yyyy = `${date.getFullYear()}`;
    const mm = `0${date.getMonth() + 1}`.slice(-2);
    const url = `https://280blocker.net/files/280blocker_adblock_${yyyy}${mm}.txt`;

    return NextResponse.redirect(url);
}