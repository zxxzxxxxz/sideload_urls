import { NextResponse } from "next/server";

const releasesUrl = 'https://api.github.com/repos/LiveContainer/LiveContainer/releases';

type releasesJson = {
    'tag_name': string;
    'published_at': string;
    'assets': {
        'name': string;
        'browser_download_url': string;
    }[];
}[];

export async function GET() {
    const response = await fetch(releasesUrl);
    const releasesJson = await response.json() as releasesJson;
    const releasesJsonFiltered = releasesJson.filter(release => {
        return release.assets.some(asset => asset.browser_download_url.endsWith('.ipa'));
    }).map(release => {
        return {
            ...release,
            assets: release.assets.filter(asset => asset.name.endsWith('.ipa')).at(0)!
        };
    });

    return NextResponse.json({
        name: 'LiveContainer',
        developerName: 'LiveContainer',
        subtitle: '',
        description: '',
        iconURL: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png',
        website: 'https://github.com/LiveContainer/LiveContainer',
        apps: [
            {
                name: 'LiveContainer',
                bundleIdentifier: 'com.kdt.livecontainer',
                iconURL: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png',
                versions: releasesJsonFiltered.map(release => {
                    return {
                        version: release.tag_name,
                        date: release.published_at,
                        downloadURL: release.assets.browser_download_url
                    };
                })
            }
        ]
    });
}