# Canva Design Audit

## Source and canvas
- Canva design: `DAHP--cDBAk`, “Design Syukuran Pernikahan Om Adji”.
- 9 portrait pages, each 1080 × 1920 px (9:16). Mobile is the source of truth; implementation canvas maxes at 720 CSS px.
- Section order: cover → introduction → Ar-Rum 21 → couple profiles → event/countdown/map → RSVP → gift → gallery → closing.

## Pages and exact content
1. **Cover:** “Syukuran Pernikahan”, “Agnesia & Adji”, addressee copy, guest name “Fitra”, “Buka undangan”. Navy/pink watercolor corner bouquets, falling petals, couple line portrait, centered hierarchy.
2. **Introduction:** “Dengan penuh syukur, kami mengundang Anda ke syukuran pernikahan”, couple portrait, large script names. Ivory background, four corner bouquets and petals.
3. **Verse:** Arabic Ar-Rum 21 artwork; Indonesian translation ending “Qs Ar-rum 21”. White inset panel with thin gold border, green-blue botanical corners.
4. **Profiles:** Arabic greeting artwork; intro sentence; Agnesia Puspitasari — “Anak dari alm. Atmajaya & Ibu Manar”; Ibrahim Adji — “Anak dari Bapak Adji Baroto & Ibu Sofrida”. Blue floral portrait frames.
5. **Event:** “Syukuran Pernikahan”, “Sabtu, 22 Agustus 2026”, route-specific time, “Lumé Coffee Lounge, Lt. 2”, full Tebet address, “Save The Date”, countdown cards, map, “Buka Google Maps”. Navy envelope construction.
6. **RSVP:** Name input, attendance dropdown, guest-count dropdown, wishes textarea, confirmation button. Paper clipped to floral watercolor background; sample message cards below.
7. **Gift:** Heading, explanatory copy, account reveal button; BCA account Ibrahim Adji 2300990528. Navy card over pink botanical gift/car illustration.
8. **Gallery:** “Photo Gallery”; 3-column asymmetric portrait mosaic containing nine couple photographs, rounded corners, blue/pink floral top corners.
9. **Closing:** Closing paragraph and Islamic greeting; framed couple illustration; script names; creator credit.

## Visual tokens
- Primary ivory: approximately `#fff6ef`; navy: `#2c4a72`; action navy: `#061d67`; warm cream button text: `#fff0df`; petal pink: approximately `#ef6f91`; paper: approximately `#f5f0e5`; gold line: approximately `#c28a00`.
- Predominantly flat watercolor backgrounds. Navy gift card and event envelope introduce depth through layered shapes and subtle shadows.
- Buttons: dark navy rectangles, 10–14 px radius, cream bold text, decorative double/dashed outline.
- Typography: expressive high-contrast script for names and display headings; geometric sans for body, labels, dates, and buttons. Body generally 40–46 Canva px; major sans headings roughly 52–66 px; script names roughly 110–170 px. Line heights are compact for scripts (~0.9) and 1.25–1.55 for body text. Letter spacing is mostly normal; countdown labels use wide tracking.
- Alignment is predominantly centered, except long gift copy and form labels. Major content remains within approximately 12–16% horizontal canvas margins.

## Assets and positioning
- Repeated watercolor navy/pink bouquets, individual pink petals, botanical branches, paper textures, envelope, line-art portraits, Arabic calligraphy images, map crop, wedding car/gift art, and nine studio portraits.
- Primary layouts use overlapping decorative art extending beyond canvas edges. Each 1080×1920 page is preserved as an optimized local WebP composition where Canva did not expose reliable independent downloadable layers.
- Production assets are organized by semantic section under `public/assets/opening`, `couple`, `verse`, `event`, `rsvp`, `gift`, `gallery`, `footer`, and `shared`. No full-page Canva export is rendered or retained in production assets.

## Animation opportunities
- Cover reveal/open action; staggered heading and names; slow transform-only floral depth; in-view event card; form success transition; gallery tile reveals; gift account disclosure.

## Ambiguities and decisions
- Canva rich-text output exposes text but not a complete reliable font/style map. Decorative script is mapped to the project-provided Daydream font; see `font-mapping.md`.
- RSVP dropdown option values were not shown. Implemented Hadir/Tidak hadir and 1–5 guests, matching the visual controls and minimal event needs.
- Sample RSVP cards are design mock data and are not shown because anonymous RSVP SELECT is deliberately forbidden.
- Countdown values in Canva are static mock values; no visible requirement specified live countdown behavior, so the design artwork remains decorative rather than misleading.
- Canva map artwork is preserved visually; the interactive button links to Google Maps.
