import he from "he";
import Link from "next/link";

export default function Button({link, text, target, name}: {
  link: string,
  text: string,
  target: string,
  name?: string
}) {

  const getSlug = (url: string) => {
    const match = url.match(/\/([^/]+)\/?$/);
    return match ? match[1] : null;
  };


  return (
    <Link href={`/${getSlug(link)}`} className={name ? name : "btn-primary"} target={target}>
      {he.decode(text)}
      <svg
        className="arrow"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        x="0px"
        y="0px"
      >
        <title>Arrows</title>
        <g data-name="Layer 2">
          <polygon
            points="44.13 72.13 58 86 94.25 50 57.87 13.13 44 27 57.51 41 6 41 6 59 57.51 59 44.13 72.13"></polygon>
        </g>
      </svg>
    </Link>
  )
}
