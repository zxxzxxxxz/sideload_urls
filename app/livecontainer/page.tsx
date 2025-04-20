import { NextResponse } from "next/server";

const releasesUrl = 'https://api.github.com/repos/LiveContainer/LiveContainer/releases';

type releasesJson = {
    'tag_name': string;
    'published_at': string;
    'assets': {
        'name': string;
        'browser_download_url': string;
    }[];
}[]

export default async function () {
    const response = await fetch(releasesUrl);
    const releasesJson = await response.json() as releasesJson;

    const html = releasesJson.map(release => {
        return <table>
            <tbody>
                <tr>
                    <td style={{padding: '0 4px'}}>{release.tag_name}</td>
                    <td style={{padding: '0 4px'}}>{release.published_at}</td>
                    <td style={{padding: '0 4px'}}>
                        {release.assets.map(asset => {
                            return <a href={`livecontainer://install?url=${asset.browser_download_url}`}>{asset.name}</a>
                        })}
                    </td>
                </tr>
            </tbody>
        </table>;
    });

    return (html);
}