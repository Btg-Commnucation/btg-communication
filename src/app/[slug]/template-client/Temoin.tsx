import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { TemoignagesType } from "@/middleware/Page";

const MediaPlayer = ({
  temoin,
  showModal,
  setShowModal,
}: {
  temoin: TemoignagesType;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {showModal && (
        <section id="media">
          <div className="container">
            <button onClick={() => setShowModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1276.9 768">
                <path
                  id="hexa"
                  d="M948.6 761.8L620.4 572.3v-379L948.6 3.7l328.3 189.5v379L948.6 761.8zM637.2 562.6l311.5 179.8 311.5-179.8V202.9L948.6 23.1 637.2 202.9v359.7z"
                ></path>
                <path
                  id="arrow"
                  d="M562.1 239l-88.3-88.3L242.9 380l231.7 234.8 88.3-88.4-86-89.1h328V322.7h-328l85.2-83.7z"
                  fill="#e3775b"
                ></path>
              </svg>
              Retour aux références
            </button>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/${temoin.id_video}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h3>
              {temoin.nom}
              <span>{temoin.job}</span>
              {temoin.societe}
            </h3>
          </div>
        </section>
      )}
    </>
  );
};

export default function Temoin({
  temoin,
  index,
}: {
  temoin: TemoignagesType;
  index: number;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <li key={index}>
      <div
        className={temoin.id_video ? "photo video" : "photo"}
        onClick={() => setShowModal(true)}
      >
        <Image
          src={temoin.portrait.url}
          alt={temoin.portrait.alt}
          width={temoin.portrait.width}
          height={temoin.portrait.height}
        />
      </div>
      <h3>
        {temoin.nom}
        <span>{temoin.job}</span>
        {temoin.societe}
      </h3>
      <Image
        src="/wave-radiant.gif"
        alt="Vague en dégradé"
        className="wave-radiant"
        width={82}
        height={15}
      />
      <div className="desc">
        <p>{temoin.description}</p>
      </div>
      {temoin.id_video && (
        <MediaPlayer
          temoin={temoin}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </li>
  );
}
