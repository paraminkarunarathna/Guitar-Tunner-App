import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/images";
import { musicTestsHubOgImage } from "@/lib/og/tests";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Free online music tests: perfect pitch, tone deafness and hearing age — GuitarTunePro";

export default function Image() {
  return musicTestsHubOgImage();
}
