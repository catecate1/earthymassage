# Architecture rules

- Render seasonal falling artwork through one shared, pointer-transparent overlay in App, using bundled raster assets and CSS-only motion; this keeps every page consistent without dependencies or interaction interference.
- Keep the Specials contest rules in a shared configuration tested for dates and eligibility; entry collection and drawing are managed by the therapist through phone/text, not automated enrollment.- Visitor chat and IP tracking go through one backend function that records the caller's IP server-side; the owner desk at /admin reads them via owner-role access, because browsers cannot see their own IP reliably and visitors must not read others' data.
