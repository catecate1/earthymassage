# Architecture rules

- Render seasonal falling artwork through one shared, pointer-transparent overlay in App, using bundled raster assets and CSS-only motion; this keeps every page consistent without dependencies or interaction interference.
- Keep the Specials contest rules in a shared configuration tested for dates and eligibility; entry collection and drawing are managed by the therapist through phone/text, not automated enrollment.