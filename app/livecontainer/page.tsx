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

    return <table>
        <thead>
            <tr>
                <th>Version</th>
                <th>Date</th>
                <th>Download</th>
            </tr>
        </thead>
        <tbody>
            {releasesJson.map(release => {
                return <tr>
                    <td>{release.tag_name}</td>
                    <td>{release.published_at}</td>
                    <td>
                        {release.assets.map(asset => {
                            return <a href={`livecontainer://install?url=${asset.browser_download_url}`}>{asset.name}</a>
                        })}
                    </td>
                </tr>;
            })}
        </tbody>
    </table>;
}