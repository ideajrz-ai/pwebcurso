/**
 * Metroplex TV: the videos the admin publishes on metroplex.com.mx live in the
 * site's public Firestore collection `videos`. These values are the site's
 * public web config (safe to ship; read access is public).
 */
export const METROPLEX_FIREBASE_PROJECT = "metroplex-noticias";
export const METROPLEX_FIREBASE_WEB_KEY = "AIzaSyBL96j3QyKixyhuK9_Pk-GLDJkzi919KyQ";

export const LATEST_VIDEO_QUERY_URL = `https://firestore.googleapis.com/v1/projects/${METROPLEX_FIREBASE_PROJECT}/databases/(default)/documents:runQuery?key=${METROPLEX_FIREBASE_WEB_KEY}`;

export const LATEST_VIDEO_QUERY_BODY = {
  structuredQuery: {
    from: [{ collectionId: "videos" }],
    orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
    limit: 1,
  },
};

export type TvVideo = {
  youtubeId: string;
  title: string;
  date: string;
  description: string;
  url: string;
  isShort: boolean;
};

type FirestoreValue = { stringValue?: string };
type FirestoreRow = { document?: { fields?: Record<string, FirestoreValue> } };

export function youtubeIdFromUrl(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0] ?? "";
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "live") return parts[1] ?? "";
    return u.searchParams.get("v") ?? "";
  } catch {
    return "";
  }
}

/** Turns the Firestore runQuery response into the newest Metroplex TV video, or null. */
export function parseLatestVideo(rows: unknown): TvVideo | null {
  if (!Array.isArray(rows)) return null;
  for (const row of rows as FirestoreRow[]) {
    const f = row?.document?.fields;
    if (!f) continue;
    const s = (k: string) => f[k]?.stringValue?.trim() ?? "";
    const rawUrl = s("url");
    const youtubeId = s("youtubeId") || youtubeIdFromUrl(rawUrl);
    if (!/^[\w-]{6,20}$/.test(youtubeId)) continue;
    return {
      youtubeId,
      title: s("titulo") || "Video de Metroplex TV",
      date: s("fecha"),
      description: s("descripcion"),
      url: rawUrl || `https://www.youtube.com/watch?v=${youtubeId}`,
      isShort: rawUrl.includes("/shorts/"),
    };
  }
  return null;
}
