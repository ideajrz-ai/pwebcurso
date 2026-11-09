import { describe, expect, it } from "vitest";

import { parseLatestVideo, youtubeIdFromUrl } from "@/lib/metroplex-tv";

const row = (fields: Record<string, string>) => ({
  document: { fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { stringValue: v }])) },
});

describe("Metroplex TV latest video", () => {
  it("uses the newest video published on metroplex.com.mx", () => {
    const video = parseLatestVideo([
      row({
        titulo: "Resumen de noticias, 9 noviembre",
        url: "https://youtube.com/shorts/2YBB0L_QU3A?feature=share",
        youtubeId: "2YBB0L_QU3A",
        fecha: "9 de noviembre de 2026",
      }),
    ]);
    expect(video?.youtubeId).toBe("2YBB0L_QU3A");
    expect(video?.title).toBe("Resumen de noticias, 9 noviembre");
    expect(video?.isShort).toBe(true);
  });

  it("returns nothing when no video has been published", () => {
    expect(parseLatestVideo([{ readTime: "2026-11-09T00:00:00Z" }])).toBeNull();
  });

  it("reads the video id from regular YouTube links", () => {
    expect(youtubeIdFromUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeIdFromUrl("https://youtu.be/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });
});
