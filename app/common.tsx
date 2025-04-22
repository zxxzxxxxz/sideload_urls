import { NextResponse } from "next/server";
import removeMarkdown from 'markdown-to-text';

export const tableStyle = { margin: '4px', width: 'calc(100% - (4px + 4px))' };
export const cellStyle = { border: '1px solid', padding: '4px', width: 'calc(100% / 4)' };
export const theadElement = <thead>
    <tr>
        <th style={cellStyle}>
            <p>Version</p>
        </th>
        <th style={cellStyle}>
            <p>Date</p>
        </th>
        <th style={cellStyle}>
            <p>DirectLink</p>
        </th>
        <th style={cellStyle}>
            <p>LiveContainerLink</p>
        </th>
    </tr>
</thead>;

export const githubResponseFunction = <T extends { githubUrl: string, descriptionUrl: string, iconUrl: string, bundleId: string, category: string, screenshots: string[] }>({ githubUrl, descriptionUrl, iconUrl, bundleId, category, screenshots }: T) => {
    return async () => {
        const githubJson = await (async () => {
            type githubJson = {
                name: string,
                owner: {
                    login: string
                },
                html_url: string,
                description: string
            };

            const response = await fetch(githubUrl);
            return await response.json() as githubJson;
        })();

        const githubReleasesJson = await (async () => {
            type githubReleasesJson = {
                tag_name: string,
                published_at: string,
                assets: {
                    name: string,
                    size: number,
                    browser_download_url: string
                }[],
                body: string
            }[];

            const response = await fetch(githubUrl + '/releases');
            const json = await response.json() as githubReleasesJson;
            return json.filter(release => {
                return release.assets.some(asset => asset.browser_download_url.endsWith('.ipa'));
            }).map(release => {
                return {
                    ...release,
                    asset: release.assets.filter(asset => asset.name.endsWith('.ipa')).at(0)!
                };
            });
        })();

        const descriptionMarkdown = await (async () => {
            const response = await fetch(descriptionUrl);
            const markdown = await response.text();
            return removeMarkdown(markdown);
        })();

        return NextResponse.json({
            name: githubJson.name,
            subtitle: githubJson.description,
            description: descriptionMarkdown,
            iconURL: iconUrl,
            website: githubJson.html_url,
            featuredApps: [ bundleId ],
            apps: [
                {
                    name: githubJson.name,
                    bundleIdentifier: bundleId,
                    developerName: githubJson.owner.login,
                    localizedDescription: githubJson.description,
                    iconURL: iconUrl,
                    category: category,
                    screenshots: screenshots,
                    versions: githubReleasesJson.map(release => {
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
};