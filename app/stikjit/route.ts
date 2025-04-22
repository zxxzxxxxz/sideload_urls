import { NextResponse } from "next/server";

const githubUrl = 'https://api.github.com/repos/StephenDev0/StikJIT';
const githubReleasesUrl = githubUrl + '/releases';

type githubJson = {
    name: string,
    owner: {
        login: string
    },
    html_url: string,
    description: string
};

type githubReleasesJson = {
    'tag_name': string,
    'published_at': string,
    'assets': {
        'name': string,
        'size': number,
        'browser_download_url': string
    }[],
    'body': string
}[];

export async function GET() {
    const releaseResponse = await fetch(githubReleasesUrl);
    const releasesJson = await releaseResponse.json() as githubReleasesJson;
    const releasesJsonFiltered = releasesJson.filter(release => {
        return release.assets.some(asset => asset.browser_download_url.endsWith('.ipa'));
    }).map(release => {
        return {
            ...release,
            asset: release.assets.filter(asset => asset.name.endsWith('.ipa')).at(0)!
        };
    });

    const githubResponse = await fetch(githubUrl);
    const githubJson = await githubResponse.json() as githubJson;

    console.log(githubJson);

    return NextResponse.json({
        name: githubJson.name,
        subtitle: githubJson.description,
        description: githubJson.description,
        iconURL: 'https://raw.githubusercontent.com/StephenDev0/StikJIT/main/assets/StikJIT_Rounded_Corners.png',
        apps: [
            {
                name: githubJson.name,
                bundleIdentifier: 'com.stik.sj',
                developerName: githubJson.owner.login,
                localizedDescription: githubJson.description,
                iconURL: 'https://raw.githubusercontent.com/StephenDev0/StikJIT/main/assets/StikJIT_Rounded_Corners.png',
                website: githubJson.html_url,
                versions: releasesJsonFiltered.map(release => {
                    return {
                        version: release.tag_name,
                        date: release.published_at,
                        localizedDescription: release.body,
                        downloadURL: release.asset.browser_download_url,
                        size: release.asset.size
                    };
                })
            }
        ]
    });
}