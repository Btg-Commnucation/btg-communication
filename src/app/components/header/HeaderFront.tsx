'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function HeaderFront() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [overlayMenu, setOverlayMenu] = useState<HTMLDivElement>();

  useEffect(() => {
    const menuElement = document.getElementById('overlay-menu');

    if (menuElement instanceof HTMLDivElement) {
      setOverlayMenu(menuElement);
    }

    if (!overlayMenu?.classList.contains('open')) {
      document.body.classList.remove('no-scroll');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openMenu = () => {
    menuRef.current!.classList.toggle('open');

    document.body.classList.toggle('no-scroll');

    if (overlayMenu) {
      overlayMenu.classList.toggle('open');
    }
  };

  return (
    <>
      <div className="logo">
        <Link href="/" title="Retour à l'accueil">
          <Image
            src="/logo-btg.svg"
            width={64}
            height={40}
            alt="Logo de BTG communication"
            quality={80}
          />
        </Link>
      </div>
      <strong>- Le bureau très graphique -</strong>
      <div className="header-rightContainer">
        <div className="contact-icons">
          <p>contact</p>
          <div className="flip-card">
            <Link href={'/contact'} className="front-face">
              <span className="screen-reader-text">Nous contacter</span>
              <Image
                src="/contact.svg"
                alt="Ouvrir la fenêtre de contact"
                width={50}
                height={50}
                quality={85}
              />
            </Link>
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
      </div>
    </>
  );
}
