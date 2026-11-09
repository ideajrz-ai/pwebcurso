import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

import {
  LATEST_VIDEO_QUERY_BODY,
  LATEST_VIDEO_QUERY_URL,
  parseLatestVideo,
  type TvVideo,
} from "@/lib/metroplex-tv";

/** Public read: newest video published in Metroplex TV on metroplex.com.mx. */
export const getLatestTvVideo = createServerFn({ method: "GET" }).handler(
  async (): Promise<TvVideo | null> => {
    try {
      const res = await fetch(LATEST_VIDEO_QUERY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LATEST_VIDEO_QUERY_BODY),
      });
      if (!res.ok) {
        console.error(`Metroplex TV query failed [${res.status}]: ${await res.text()}`);
        return null;
      }
      return parseLatestVideo(await res.json());
    } catch (error) {
      console.error("Metroplex TV query error:", error);
      return null;
    }
  },
);

export const latestTvVideoQuery = queryOptions({
  queryKey: ["metroplex-tv", "latest"],
  queryFn: () => getLatestTvVideo(),
  staleTime: 5 * 60 * 1000,
});
