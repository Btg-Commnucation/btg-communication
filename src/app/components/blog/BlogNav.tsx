import { MenuData, OptionsType, rsOptions } from "@/middleware/Header";
import Image from "next/image";
import Link from "next/link";
import he from "he";
import Rs from "../header/Rs";

export default function BlogNav({
  data,
  options,
}: {
  data: MenuData[];
  options: rsOptions;
}) {
  return (
    <div className="list-nav">
      <div className="vague">
        <Image
          src="/wave-yellow.gif"
          alt="vague jaune"
          width={188}
          height={32}
          quality={75}
        />
      </div>
      <nav className="menu-nav">
        <ul id="menu-principal">
          {data.map((item) => (
            <li key={item.ID}>
              <Link href={`/${item.slug}`}>{he.decode(item.title)}</Link>
            </li>
          ))}
        </ul>
        <Rs rsOptions={options} showContact={false} />
      </nav>
    </div>
  );
}
