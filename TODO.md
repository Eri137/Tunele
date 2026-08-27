# Tunele — Things to Come Back To

## Song bank — still missing (games with these combos will 404 right now)
- [ ] Hip-Hop — Hard tier (suggestion: "m.A.A.d city" – Kendrick Lamar)
- [ ] R&B — Medium tier (suggestion: "Adorn" – Miguel)
- [ ] R&B — Hard tier (suggestion: "Untitled (How Does It Feel)" – D'Angelo)
- [ ] Gospel — Easy / Medium / Hard (nothing added yet)
- [ ] Country — Easy / Medium / Hard (nothing added yet)
- [ ] Long term: grow each tier from 1 song to 5–10+ songs per genre, so it doesn't
      repeat the same song constantly

## clipStart values need real listening, not placeholders
- [ ] IMPORTANT CONTEXT: iTunes previewUrl is already a short ~30s clip, not the
      full song — clipStart means "seconds into that 30s preview," not
      "seconds into the full track"
- [ ] Every song currently has clipStart set to a placeholder (0, 20, or 45) —
      go back, actually listen to each previewUrl in a browser tab, and pick a
      real timestamp that lines up with the intended section
      (chorus/verse/intro depending on difficulty tier)

## Hints — collaboratorHint only exists on 2 songs so far
- [ ] Every Hard-tier song needs a collaboratorHint written (currently only
      "Thriller" and "Comfortably Numb" have one)
- [ ] Easy/Medium tier hint LOGIC (decade comparison, popularity comparison,
      artist-popularity comparison) hasn't been built into code yet at all —
      still just a design plan, not implemented

## Known simplifications / temporary states
- [ ] /api/daily-song currently returns only id, previewUrl, clipStart (name/
      artist are correctly hidden now — this was already fixed, just confirming
      it stays this way)
- [ ] Duplicate/near-duplicate search results (e.g. multiple "Thriller" entries
      from different albums) aren't de-duplicated yet — relevant once building
      the real guess-search box in a later phase
- [ ] previewUrl links from iTunes aren't guaranteed permanent — if one stops
      working later, it's not a bug, just re-search and grab a fresh link

## Environment / setup notes (for future reference, not action items)
- iTunes search has an unofficial rate limit (~20 requests/min) — occasional
  "Failed to search tracks" errors during heavy testing are usually this,
  not a real bug. Wait ~30s and retry.
- Spotify access tokens expire after 1 hour — getAccessToken() already
  handles re-fetching automatically, no action needed