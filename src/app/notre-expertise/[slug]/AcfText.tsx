import { TextContentType } from "./page";

export default function AcfText({ data }: { data: TextContentType }) {
  return (
    <div
      className="text"
      dangerouslySetInnerHTML={{ __html: data.texte }}
    ></div>
  );
}
