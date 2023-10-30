"use client";

import {MenuData} from "@/middleware/Header";
import Link from "next/link";
import MenuToggler from "./MenuToggler";
import {useEffect, useState} from "react";
import he from "he";

export default function BlogHeaderFront({element}: { element: MenuData[] }) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  return (
    <>
      {windowWidth > 1023 ? (
        <nav className="blog-nav">
          <ul>
            {element &&
              element.map((item, index: number) => (
                <li key={index}>
                  <Link href={`/blog?category=${item.slug}`}>{he.decode(item.title)}</Link>
                </li>
              ))}
          </ul>
        </nav>
      ) : (
        <MenuToggler/>
      )}
    </>
  );
}
