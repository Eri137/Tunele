const NOISE_WORDS = ["feat", "featuring", "ft", "with", "the", "a", "an", "and", "remaster", "remastered", "live", "version", "remix", "edit", "radio"];

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .filter((word) => word && !NOISE_WORDS.includes(word))
    .join(" ");
}

export function titleMatches(a, b) {
  const normA = normalize(a);
  const normB = normalize(b);
  return normA.includes(normB) || normB.includes(normA);
}

export function artistMatches(a, b) {
  const wordsA = new Set(normalize(a).split(" ").filter(Boolean));
  const wordsB = new Set(normalize(b).split(" ").filter(Boolean));
  for (const word of wordsA) {
    if (word.length > 2 && wordsB.has(word)) return true;
  }
  return wordsA.size === 0 || wordsB.size === 0;
}

function upsizeArtwork(url) {
  return url ? url.replace("100x100bb", "600x600bb") : null;
}

function formatTrack(t) {
  return {
    id: String(t.trackId),
    name: t.trackName,
    artist: t.artistName,
    album: t.collectionName || null,
    albumArt: upsizeArtwork(t.artworkUrl100),
    releaseDate: t.releaseDate ? t.releaseDate.slice(0, 10) : null,
    previewUrl: t.previewUrl || null,
    duration: t.trackTimeMillis ? Math.round(t.trackTimeMillis / 1000) : null,
    explicit: t.trackExplicitness === "explicit",
  };
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// iTunes rate-limits by returning either 429 or 403 depending on the
// situation — treat both as "back off and retry", not a hard failure.
async function fetchWithBackoff(url, retriesLeft = 4, backoffMs = 3000) {
  const response = await fetch(url);

  if ((response.status === 429 || response.status === 403) && retriesLeft > 0) {
    console.log(`    (iTunes rate limited (${response.status}) — waiting ${backoffMs / 1000}s before retrying)`);
    await wait(backoffMs);
    return fetchWithBackoff(url, retriesLeft - 1, backoffMs * 2); // double the wait each retry
  }

  return response;
}

export async function searchItunes(query, limit = 10) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=${limit}`;
  const response = await fetchWithBackoff(url);

  if (!response.ok) {
    throw new Error(`iTunes search failed with status ${response.status}`);
  }

  const data = await response.json();
  return (data.results || [])
    .filter((t) => t.previewUrl)
    .map(formatTrack);
}