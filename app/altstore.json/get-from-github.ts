import * as AltStoreRepoJson from './altstore-repo-json-type';

type githubJsonType = {
    name: string,
    owner: {
        login: string
    },
    html_url: string,
    description: string
};

type githubReleasesJsonType = {
    tag_name: string,
    published_at: string,
    assets: {
        name: string,
        size: number,
        browser_download_url: string
    }[],
    body: string
}[];

export type getFromGithubParamsType = {
    githubUrl: string,
    iconUrl: string,
    bundleId: string,
    category?: string,
    screenshots: string[]
};

export async function getFromGithub({ githubUrl, iconUrl, bundleId, category, screenshots }: getFromGithubParamsType): Promise<AltStoreRepoJson.App> {
    const githubJson = await (async () => {
        const response = await fetch(githubUrl);
        return await response.json() as githubJsonType;
    })();

    const githubReleasesJson = await (async () => {
        const response = await fetch(githubUrl + '/releases');
        const json = await response.json() as githubReleasesJsonType;
        return json.filter(release => {
            return release.assets.some(asset => asset.browser_download_url.endsWith('.ipa'));
        }).map(release => {
            return {
                ...release,
                asset: release.assets.filter(asset => asset.name.endsWith('.ipa')).at(0)!
            };
        });
    })();

    return {
        name: githubJson.name,
        bundleIdentifier: bundleId,
        marketplaceID: '',
        developerName: githubJson.owner.login,
        localizedDescription: githubJson.description,
        iconURL: iconUrl,
        category: category ?? 'other',
        screenshots: screenshots,
        versions: githubReleasesJson.map(release => {
            return {
                version: release.tag_name,
                buildVersion: release.tag_name,
                date: release.published_at,
                localizedDescription: release.body,
                downloadURL: release.asset.browser_download_url,
                size: release.asset.size
            };
        }),
        appPermissions: {
            entitlements: [],
            privacy: {}
        }
    };
}