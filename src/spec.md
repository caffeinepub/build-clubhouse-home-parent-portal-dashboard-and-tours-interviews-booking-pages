# Specification

## Summary
**Goal:** Create three navigable, family-friendly pages (Clubhouse Home, Parent Portal Dashboard, Tours & Interviews Booking) with a cohesive “interactive digital playground” theme, plus minimal backend support for portal status data and booking requests.

**Planned changes:**
- Apply a consistent playful UI theme across pages (rounded bubble containers, warm sunny palette not dominated by blue/purple, consistent typography/spacing, star/butterfly accents).
- Add routing and visible navigation between Clubhouse Home, Parent Portal, and Tours & Interviews pages.
- Build the Clubhouse Home page with a sunny-park hero section and a visually dominant CTA labeled exactly “Join the Club”.
- Build the Parent Portal dashboard with an Internet Identity sign-in gate, a centerpiece nanny-cam media area with a fun border/frame, and quick-glance widgets labeled exactly “Nap”, “Snack”, and “Play”.
- Implement a single Motoko backend API to provide portal statuses (Nap/Snack/Play + timestamps) and a nanny-cam media URL/placeholder.
- Build the Tours & Interviews booking page with a calendar-style scheduling UI, an adjacent “Meet Auntie Maia” media area (responsive stacking on mobile), and sticker-style star/butterfly decorations around the calendar.
- Implement backend support to create and list booking requests per signed-in user (by Principal), persist in canister state, and show a confirmation state after successful submission.
- Add generated image assets as static files under `frontend/public/assets/generated` and render them on the appropriate pages (home hero, portal frame, booking stickers).

**User-visible outcome:** Users can navigate between the Home, Parent Portal, and Booking pages; see a playful themed Home page with a giant “Join the Club” button; sign in with Internet Identity to access a Parent Portal showing a framed nanny-cam area and Nap/Snack/Play statuses; and submit a tour/interview booking from a calendar UI and receive a confirmation, with requests persisted and viewable on refresh.
