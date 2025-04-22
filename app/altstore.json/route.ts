import { NextResponse } from "next/server";
import { getFromGithub, type getFromGithubParamsType } from './get-from-github';
import { getFromAltStoreRepo, type getFromAltStoreRepoParamsType } from './get-from-altstore-repo';
import * as AltStoreRepoJsonType from './altstore-repo-json-type';

const appParams = [
    {
        type: 'github',
        param: {
            githubUrl: 'https://api.github.com/repos/LiveContainer/LiveContainer',
            iconUrl: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png',
            bundleId: 'com.kdt.livecontainer',
            screenshots: [
                {
                    imageURL: 'https://raw.githubusercontent.com/LiveContainer/LiveContainer/main/screenshots/livecontainer_icon.png',
                    width: 217,
                    height: 217
                }
            ]
        }
    },
    {
        type: 'github',
        param: {
            githubUrl: 'https://api.github.com/repos/StephenDev0/StikJIT',
            iconUrl: 'https://raw.githubusercontent.com/StephenDev0/StikJIT/main/assets/StikJIT_Rounded_Corners.png',
            bundleId: 'com.stik.sj',
            screenshots: [
                'https://raw.githubusercontent.com/neoarz/StikJIT/main/assets/views/light/HomeScreen.PNG',
                'https://raw.githubusercontent.com/neoarz/StikJIT/main/assets/views/light/AppsList.PNG',
                'https://raw.githubusercontent.com/neoarz/StikJIT/main/assets/views/light/Settings.PNG',
                'https://github.com/neoarz/StikJIT/raw/main/assets/views/light/GetJIT.gif?raw=true'
            ]
        }
    },
    {
        type: 'altstore',
        param: {
            repoUrl: 'https://ipa.cypwn.xyz/cypwn_unique.json',
            bundleId: 'com.google.ios.youtube'
        }
    },
    {
        type: 'altstore',
        param: {
            repoUrl: 'https://ipa.cypwn.xyz/cypwn_unique.json',
            bundleId: 'com.atebits.Tweetie2'
        }
    },
    {
        type: 'altstore',
        param: {
            repoUrl: 'https://ipa.cypwn.xyz/cypwn_unique.json',
            bundleId: 'com.duolingo.DuolingoMobile'
        }
    }
] as ({
    type: 'github',
    param: getFromGithubParamsType
} | {
    type: 'altstore',
    param: getFromAltStoreRepoParamsType
})[];

export async function GET() {
    const date = new Date();

    const apps = await Promise.all(appParams.map(async appParam => {
        switch (appParam.type) {
            case 'github':
                return await getFromGithub(appParam.param);
            case 'altstore':
                return await getFromAltStoreRepo(appParam.param);
        }
    })) as AltStoreRepoJsonType.App[];

    return NextResponse.json({
        name: `zxxzxxxxz Source`,
        iconURL: 'https://avatars.githubusercontent.com/u/16576653?v=4',
        website: 'https://sideloadurls.vercel.app',
        featuredApps: [
            'com.kdt.livecontainer',
            'com.stik.sj'
        ],
        apps: apps,
        news: [
            {
                title: date.toISOString(),
                identifier: date.toISOString(),
                caption: '',
                date: date.toISOString(),
                tintColor: '#000000'
            }
        ]
    } as AltStoreRepoJsonType.Source);
}
export const POST = GET;