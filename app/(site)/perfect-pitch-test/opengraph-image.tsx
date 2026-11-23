import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/images";
import { musicTestOgAlt, musicTestOgImage } from "@/lib/og/tests";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = musicTestOgAlt("perfect-pitch");

export default function Image() {
  return musicTestOgImage("perfect-pitch");
}
