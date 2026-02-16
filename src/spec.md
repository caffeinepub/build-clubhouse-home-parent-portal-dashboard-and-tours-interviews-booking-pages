# Specification

## Summary
**Goal:** Make the tours/interviews booking page functional end-to-end with required Internet Identity auth, reliable confirmation, persisted contact details, clear error feedback, and an up-to-date list of the signed-in user’s submitted requests.

**Planned changes:**
- Gate `/tours` behind Internet Identity sign-in using the existing auth UI so signed-out users see the AuthPanel instead of the booking form.
- Fix the booking confirmation modal to open automatically after successful submission and show the submitted date/time, submitted details, and returned booking ID.
- Extend the booking form to collect required parent name and parent email, plus optional notes; disable submit until required fields are present.
- Persist the added contact fields with the booking request in the backend and display them when listing stored requests.
- Add user-facing error messaging for failed submissions while keeping/loading state behavior that prevents duplicate submissions.
- Keep a “Your Tour Requests” list on `/tours` that updates after creating a new request (without full reload) and shows a clear empty state when there are no bookings.

**User-visible outcome:** Signed-in parents can submit a tour/interview booking with their name/email and notes, immediately see a confirmation with the correct details and booking ID, receive clear error messages if something fails, and view an updated list of their stored tour requests on the same page.
