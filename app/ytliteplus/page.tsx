import { theadElement, tableStyle, cellStyle } from '../common';
import { basename } from 'path';

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

export default async () => {
    const response = await fetch(altstoreRepoUrl);
    const repoJson = await response.json() as repoJson;
    const versionsJson = repoJson.apps.filter(app => {
        return app.name == 'YTLitePlus';
    }).at(0)?.versions;

    return <>
        <h1>YTLitePlus</h1>
        <details open={true}>
            <summary>latest</summary>
            <table style={tableStyle}>
                {theadElement}
                <tbody>
                    {versionsJson?.filter((_, index) => index == 0).map(versions => {
                        return <tr>
                            <td style={cellStyle}>
                                <p>{versions.version}</p>
                            </td>
                            <td style={cellStyle}>
                                <p>{versions.date}</p>
                            </td>
                            <td style={cellStyle}>
                                <p>
                                    <a href={versions.downloadURL}>{basename(versions.downloadURL)}</a>
                                </p>
                            </td>
                            <td style={cellStyle}>
                                <p>
                                    <a href={`livecontainer://install?url=${versions.downloadURL}`}>{basename(versions.downloadURL)}</a>
                                </p>
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
                    {versionsJson?.filter((_, index) => index != 0).map(versions => {
                        return <tr>
                            <td style={cellStyle}>
                                <p>{versions.version}</p>
                            </td>
                            <td style={cellStyle}>
                                <p>{versions.date}</p>
                            </td>
                            <td style={cellStyle}>
                                <p>
                                    <a href={versions.downloadURL}>{basename(versions.downloadURL)}</a>
                                </p>
                            </td>
                            <td style={cellStyle}>
                                <p>
                                    <a href={`livecontainer://install?url=${versions.downloadURL}`}>{basename(versions.downloadURL)}</a>
                                </p>
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>
        </details>
    </>;
}