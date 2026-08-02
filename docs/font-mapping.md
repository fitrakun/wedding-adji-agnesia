# Font Mapping

| Canva role | Implementation | Loading |
|---|---|---|
| Curvy couple names and decorative headings | Daydream | `next/font/local` from `public/fonts/daydream.woff2`, exposed as `--font-daydream` with `display: swap` |
| Normal headings, dates, paragraphs, labels, buttons, and controls | Open Sans 300–800, normal and italic | `next/font/google`, exposed as `--font-open-sans` with `display: swap` |
| Arabic verse and greeting | Real HTML Arabic text using a safe serif fallback | No font file redistribution; preserves selectable, accessible text |

Utilities are defined globally as `.font-daydream` and `.font-open-sans`. Daydream is only used for decorative Canva typography; all ordinary UI and body content uses Open Sans.
