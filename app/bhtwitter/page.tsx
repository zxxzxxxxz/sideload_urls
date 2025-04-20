const releasesUrl = 'https://api.github.com/repos/BandarHL/BHTwitter/releases';

type releasesJson = {
    'tag_name': string;
    'published_at': string;
    'assets': {
        'name': string;
        'browser_download_url': string;
    }[];
}[];

const tableStyle = { margin: '4px' };
const thStyle = { border: '1px solid', padding: '4px' };
const tdStyle = { border: '1px solid', padding: '4px' };

export default async () => {
    const response = await fetch(releasesUrl);
    const releasesJson = await response.json() as releasesJson;
    const releasesJsonFiltered = releasesJson.filter(release => {
        return release.assets.some(asset => asset.browser_download_url.endsWith('.ipa'));
    }).map(release => {
        return {
            ...release,
            assets: release.assets.filter(asset => asset.name.endsWith('.ipa'))
        };
    });

    return <table style={tableStyle}>
        <thead>
            <tr>
                <th style={thStyle}>
                    <p>tag_name</p>
                </th>
                <th style={thStyle}>
                    <p>published_at</p>
                </th>
                <th style={thStyle}>
                    <p>browser_download_url</p>
                </th>
            </tr>
        </thead>
        <tbody>
            {releasesJsonFiltered.map(release => {
                return <tr>
                    <td style={tdStyle}>
                        <p>{release.tag_name}</p>
                    </td>
                    <td style={tdStyle}>
                        <p>{release.published_at}</p>
                    </td>
                    <td style={tdStyle}>
                        {release.assets.map(asset => {
                            return <p>
                                <a href={`livecontainer://install?url=${asset.browser_download_url}`}>{asset.name}</a>
                            </p>;
                        })}
                    </td>
                </tr>;
            })}
        </tbody>
    </table>;
}