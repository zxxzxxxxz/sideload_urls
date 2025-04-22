import * as AltStoreRepoJsonType from './altstore-repo-json-type';

export type getFromAltStoreRepoParamsType = {
    repoUrl: string,
    bundleId: string
}

export async function getFromAltStoreRepo({ repoUrl, bundleId }: getFromAltStoreRepoParamsType): Promise<AltStoreRepoJsonType.App> {
    const response = await fetch(repoUrl);
    const repoJson = await response.json() as AltStoreRepoJsonType.Source;

    return repoJson.apps.filter(app => app.bundleIdentifier == bundleId).at(0)!;
};