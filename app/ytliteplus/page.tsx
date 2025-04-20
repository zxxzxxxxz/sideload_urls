const altstoreRepoUrl = 'https://raw.githubusercontent.com/YTLitePlus/YTLitePlus-Altstore/main/apps.json';

type repoJson = {
    'apps': {
        'name': string,
        'versions': {
            'version': string,
            'date': string,
            'downloadURL': string
        }[]
    }[]
};

const tableStyle = { margin: '4px' };
const thStyle = { border: '1px solid', padding: '4px' };
const tdStyle = { border: '1px solid', padding: '4px' };

export default async () => {
    const response = await fetch(altstoreRepoUrl);
    const repoJson = await response.json() as repoJson;
    const versionsJson = repoJson.apps.filter(app => {
        return app.name == 'YTLitePlus';
    }).at(0)?.versions;

    return <table style={tableStyle}>
        <thead>
            <tr>
                <th style={thStyle}>
                    <p>version</p>
                </th>
                <th style={thStyle}>
                    <p>date</p>
                </th>
                <th style={thStyle}>
                    <p>downloadURL</p>
                </th>
            </tr>
        </thead>
        <tbody>
            {versionsJson?.map(versions => {
                return <tr>
                    <td style={tdStyle}>
                        <p>{versions.version}</p>
                    </td>
                    <td style={tdStyle}>
                        <p>{versions.date}</p>
                    </td>
                    <td style={tdStyle}>
                        <p>
                            <a href={`livecontainer://install?url=${versions.downloadURL}`}>{`livecontainer://install?url=${versions.downloadURL}`}</a>
                        </p>
                    </td>
                </tr>;
            })}
        </tbody>
    </table>;
}