import { PageType } from "@/middleware/Page";
import Image from "next/image";
import he from "he";

export default function Banner({
  title,
  media,
  sous_titre,
}: {
  title: string;
  media: {
    "2048x2048": string;
  };
  sous_titre: string;
}) {
  return (
    <section
      className="banner"
      style={{
        background: `url('${media["2048x2048"]}') no-repeat top center`,
        backgroundSize: "cover",
        marginTop: "4.4rem",
      }}
    >
      <Image
        src="/logo-btg-white.svg"
        alt="BTG Communication logo"
        width={219}
        height={253}
      />
      <div className="vague">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 188 32"
          style={{ fill: "white" }}
        >
          <path d="M156.7 32c-9.5 0-14.2-7.7-18.2-14.5-4.4-7.1-7.4-11.5-13.2-11.5-5.7 0-8.8 4.4-13.1 11.5C108.1 24.3 103.5 32 94 32s-14.2-7.7-18.2-14.5C71.4 10.4 68.4 6 62.7 6c-5.7 0-8.8 4.4-13.1 11.5C45.5 24.3 40.9 32 31.3 32s-14.2-7.7-18.2-14.5C8.8 10.4 5.7 6 0 6V0c9.5 0 14.2 7.7 18.2 14.5C22.6 21.6 25.6 26 31.3 26c5.7 0 8.8-4.4 13.1-11.5C48.5 7.7 53.1 0 62.7 0c9.5 0 14.2 7.7 18.2 14.5C85.2 21.6 88.3 26 94 26s8.8-4.4 13.1-11.5C111.2 7.7 115.8 0 125.3 0s14.2 7.7 18.2 14.5c4.3 7.2 7.4 11.5 13.1 11.5s8.8-4.4 13.1-11.5C173.8 7.7 178.5 0 188 0v6c-5.7 0-8.8 4.4-13.1 11.5-4.1 6.8-8.7 14.5-18.2 14.5z"></path>
        </svg>
      </div>
      <div className="title">
        <h1>{he.decode(title)}</h1>
        <p className="sub-title">{he.decode(sous_titre)}</p>
      </div>
    </section>
  );
}
