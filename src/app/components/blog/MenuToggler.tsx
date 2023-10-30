"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";

export default function MenuToggler() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [overlayMenu, setOverlayMenu] = useState<HTMLDivElement>();

  useEffect(() => {
    const menuElement = document.getElementById("overlay-menu");

    if (menuElement instanceof HTMLDivElement) {
      setOverlayMenu(menuElement);
    }

    if (!overlayMenu?.classList.contains("open")) {
      document.body.classList.remove("no-scroll");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMenu = () => {
    menuRef.current!.classList.toggle("open");

    document.body.classList.toggle("no-scroll");

    if (overlayMenu) {
      overlayMenu.classList.toggle("open");
    }
  };
  return (
    <div className="menu" ref={menuRef}>
      <p>Menu</p>
      <div id="menu-img" onClick={openMenu}>
        <div className="front-face">
          <Image
            src="/menu.svg"
            alt="Ouvrir le menu"
            width={50}
            height={50}
            quality={85}
          />
        </div>
        <div className="back-face">
          <Image
            src="/close-menu.svg"
            alt="Fermer le menu"
            width={50}
            height={50}
            quality={85}
          />
        </div>
      </div>
    </div>
  );
}
