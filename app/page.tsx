import Image from "next/image";

const links = new Map([
  ['BHTwitter', './bhtwitter'],
  ['LiveContainer', './livecontainer'],
  ['YTLitePlus', './ytliteplus']
]);

export default function Home() {
  return links.entries().map(([label, url]) => {
    return <p>
      <a href={url}>{label}</a>
    </p>
  })
}
