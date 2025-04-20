import { NextResponse } from "next/server";
import { parse } from 'node-html-parser';

async function fetchJson(id: string) {
    const res = await fetch(`https://www.imdb.com/title/${id}/`);
    const htmlText = await res.text();
    const root = parse(htmlText);
    const jsonText = root.querySelector('script[type="application/ld+json"]')?.innerText;
    return JSON.parse(jsonText ?? '{}');
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string, keys?: string[] }> }) {
    const { id, keys } = await params;

    const json = await fetchJson(id);

    const value = (keys ?? []).reduce((accumulator, currentValue) => accumulator[currentValue], json);

    if (typeof value == 'object')
        return NextResponse.json(value);

    return new NextResponse(value);
}