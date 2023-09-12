import { PostData } from "@/middleware/Post";
import he from "he";

export default function AcfLayout({ data }: { data: PostData }) {
  return (
    <div className="elem-container">
      {data.acf.content.map((item, index: number) => (
        <>
          {item.acf_fc_layout === "sous_titre" && (
            <h2 key={index}>{he.decode(item.sous_titre)}</h2>
          )}
          {item.acf_fc_layout === "texte" && (
            <div
              key={index}
              className="exo-light-18"
              dangerouslySetInnerHTML={{ __html: item.texte }}
            ></div>
          )}
        </>
      ))}
    </div>
  );
}
