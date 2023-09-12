import { VideoContentType } from "./page";

export default function AcfVideo({ video }: { video: VideoContentType }) {
  return (
    <iframe
      width="1000"
      height="563"
      src={video.video}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
