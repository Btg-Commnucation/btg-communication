"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeaderFront() {
  const menuRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [overlayMenu, setOverlayMenu] = useState<HTMLDivElement>();
  const [overlayContact, setOverlayContact] = useState<HTMLDivElement>();

  useEffect(() => {
    const menuElement = document.getElementById("overlay-menu");
    const contactElement = document.getElementById("overlay-contact");

    if (menuElement instanceof HTMLDivElement) {
      setOverlayMenu(menuElement);
    }

    if (contactElement instanceof HTMLDivElement) {
      setOverlayContact(contactElement);
    }

    if (
      !overlayContact?.classList.contains("open") ||
      !overlayMenu?.classList.contains("open")
    ) {
      document.body.classList.remove("no-scroll");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMenu = () => {
    menuRef.current!.classList.toggle("open");
    contactRef.current!.classList.remove("open");

    document.body.classList.toggle("no-scroll");

    if (overlayContact) {
      overlayContact.classList.remove("open");
    }

    if (overlayMenu) {
      overlayMenu.classList.toggle("open");
    }
  };

  const openContact = () => {
    contactRef.current!.classList.toggle("open");
    menuRef.current!.classList.remove("open");

    document.body.classList.toggle("no-scroll");

    if (overlayMenu) {
      overlayMenu.classList.remove("open");
    }

    if (overlayContact) {
      overlayContact.classList.toggle("open");
    }
  };

  return (
    <>
      <div className="logo">
        <Link href="/" title="Retour à l'accueil">
          <Image
            src="/logo-btg.svg"
            width={64}
            height={36}
            alt="Logo de BTG communication"
            quality={80}
          />
        </Link>
      </div>
      <strong>- Le bureau très graphique -</strong>
      <div className="contact-icons" ref={contactRef}>
        <div className="flip-card" onClick={openContact}>
          <div className="front-face">
            <Image
              src="/contact.svg"
              alt="Ouvrir la fenêtre de contact"
              width={50}
              height={50}
              quality={85}
            />
          </div>
          <div className="back-face">
            <Image
              src="/close-contact.svg"
              alt="Fermer la fenêtre de contact"
              width={50}
              height={50}
              quality={85}
            />
          </div>
        </div>
      </div>
      <div className="menu" ref={menuRef}>
        <p>menu</p>
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
    </>
  );
}
