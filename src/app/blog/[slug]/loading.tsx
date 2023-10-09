import Image from "next/image";

function loading() {
  return (
    <main className="loading-mail">
      <section className="loading">
        <div className="container">
          <div className="image-container">
            <Image
              src="logo-btg-encadre.svg"
              alt="Logo BTG Communication"
              width={370}
              height={427}
            />
            <div className="background-pulse"></div>
          </div>
          <h1>Chargement ...</h1>
          <p>Notre site arrive !</p>
        </div>
      </section>
    </main>
  );
}

export default loading;
