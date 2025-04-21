const links = new Map([
  ['BHTwitter', './bhtwitter'],
  ['YTLitePlus', './ytliteplus'],
  ['LiveContainer AltStoreRepo', './livecontainer']
]);

export default function Home() {
  return links.entries().map(([label, url]) => {
    return <h1>
      <a href={url}>{label}</a>
    </h1>;
  })
}
