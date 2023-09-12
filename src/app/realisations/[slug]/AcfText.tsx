import { TextContentType } from "./page";

export default function AcfText({ text }: { text: TextContentType }) {
  return <div dangerouslySetInnerHTML={{ __html: text.texte }}></div>;
}
