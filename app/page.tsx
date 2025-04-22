"use server";
import * as AltStoreRepoJsonType from './altstore.json/altstore-repo-json-type';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const hostname = headersList.get('x-forwarded-host');

  const request = await fetch(`http://${hostname}/altstore.json`);
  const json = await request.json() as AltStoreRepoJsonType.Source;

  return <>
    <table>
      <tbody>
        {json.apps.map(app => {
          return {
            name: app.name,
            date: (() => {
              if (app.versions) return app.versions.at(0)?.date;
              if (app.version) return app.versionDate;
            })(),
            downloadURL: (() => {
              if (app.versions) return app.versions.at(0)?.downloadURL;
              if (app.version) return app.downloadURL;
            })()
          }
        }).map(({ name, downloadURL }) => <tr>
          <td style={{ border: '1px solid', padding: '4px' }}>{name}</td>
          <td style={{ border: '1px solid', padding: '4px' }}>
            <a href={downloadURL}>Download</a>
          </td>
          <td style={{ border: '1px solid', padding: '4px' }}>
            <a href={`altstore://install?url=${downloadURL}`}>Install on AltStore</a>
          </td>
          <td style={{ border: '1px solid', padding: '4px' }}>
            <a href={`livecontainer://install?url=${downloadURL}`}>Install on LiveContainer</a>
          </td>
        </tr>)}
      </tbody>
    </table>
    <a href="./altstore.json">AltStore Source</a>
  </>;
}
