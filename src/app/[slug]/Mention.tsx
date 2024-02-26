import Banner from '@/components/Banner';

export default function Mention({
  data,
}: {
  data: { title: string; content: string; media: { '2048x2048': string } };
}) {
  return (
    <>
      <Banner title={data.title} media={data.media} sous_titre="" />
      <section id="page">
        <main id="main" className="site-main">
          <div
            className="container mentions-pages"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </main>
      </section>
    </>
  );
}
