import { parseShareParams } from "@/lib/musicTests";
import { musicTestsHubOgImage, testResultOgImage } from "@/lib/og/tests";

/** PNG for a shared test result: /share/test/image?t=perfect-pitch&s=9 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const result = parseShareParams((key) => params.get(key));
  const image = await (result ? testResultOgImage(result.id, result.score) : musicTestsHubOgImage());
  image.headers.set("Cache-Control", "public, max-age=86400, immutable");
  return image;
}
