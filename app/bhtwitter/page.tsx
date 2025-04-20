import { theadElement, tableStyle, cellStyle } from '../common';

const releasesUrl = 'https://api.github.com/repos/BandarHL/BHTwitter/releases';

type releasesJson = {
    'tag_name': string;
    'published_at': string;
    'assets': {
        'name': string;
        'browser_download_url': string;
    }[];
}[];

export default async () => {
    const response = await fetch(releasesUrl);
    const releasesJson = await response.json() as releasesJson;
    const releasesJsonFiltered = releasesJson.filter(release => {
        return release.assets.some(asset => asset.browser_download_url.endsWith('.ipa'));
    }).map(release => {
        return {
            ...release,
            assets: release.assets.filter(asset => asset.name.endsWith('.ipa') && !asset.name.includes('TrollStore'))
        };
    });

    return <>
        <h1>BHTwitter</h1>
        <details open={true}>
            <summary>latest</summary>
            <table style={tableStyle}>
                {theadElement}
                <tbody>
                    {releasesJsonFiltered.filter((_, index) => index == 0).map(release => {
                        return <tr>
                            <td style={cellStyle}>
                                <p>{release.tag_name}</p>
                            </td>
                            <td style={cellStyle}>
                                <p>{release.published_at}</p>
                            </td>
                            <td style={cellStyle}>
                                {release.assets.map(asset => {
                                    return <p>
                                        <a href={asset.browser_download_url}>{asset.browser_download_url}</a>
                                    </p>;
                                })}
                            </td>
                            <td style={cellStyle}>
                                {release.assets.map(asset => {
                                    return <p>
                                        <a href={`livecontainer://install?url=${asset.browser_download_url}`}>{asset.browser_download_url}</a>
                                    </p>;
                                })}
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </details>
        <details open={false}>
            <summary>old</summary>
            <table style={tableStyle}>
                {theadElement}
                <tbody>
                    {releasesJsonFiltered.filter((_, index) => index != 0).map(release => {
                        return <tr>
                            <td style={cellStyle}>
                                <p>{release.tag_name}</p>
                            </td>
                            <td style={cellStyle}>
                                <p>{release.published_at}</p>
                            </td>
                            <td style={cellStyle}>
                                {release.assets.map(asset => {
                                    return <p>
                                        <a href={asset.browser_download_url}>{asset.browser_download_url}</a>
                                    </p>;
                                })}
                            </td>
                            <td style={cellStyle}>
                                {release.assets.map(asset => {
                                    return <p>
                                        <a href={`livecontainer://install?url=${asset.browser_download_url}`}>{asset.browser_download_url}</a>
                                    </p>;
                                })}
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </details>
    </>;
}