## Plan: Remote-Friendly Coffee Directory (Next.js SPA)

Design a single-page, admin-manageable coffee shop directory using Next.js (App Router), React, and Tailwind, structured like a small professional app with clear separation of concerns and room to grow.

**Steps**

1. Project bootstrap and base tooling
   - Initialize a new Next.js App Router project with TypeScript and Tailwind.
   - Configure basic linting/formatting (ESLint + Prettier) and recommended VS Code settings.
   - Verify dev server runs and Tailwind styles apply.

2. Folder structure and architectural scaffolding
   - Use App Router: create app/page.tsx as the main (and only) page.
   - Create a components tree:
     - components/layout/AppShell (top-level layout wrapper for header, main content, footer)
     - components/coffee/CoffeeShopList, CoffeeShopCard
     - components/admin/AdminControls, AddCoffeeShopModal, AdminLoginForm (if separate)
     - components/common/Button, RatingDisplay, Modal
   - Create a lib layer:
     - lib/types.ts for TypeScript interfaces (CoffeeShop, Rating, AdminSession, etc.).
     - lib/validation.ts for form validation schemas (e.g., using Zod or a simple manual schema).
     - lib/api-client.ts (optional) for client-side fetch helpers to hit /api endpoints.
   - (If using server actions) create app/actions/coffeeShops.ts for server actions; otherwise rely on route handlers under app/api.

3. Data model design
   - Define a CoffeeShop entity with fields: id, name, mapsUrl or address, coffeeRating, wifiRating, workRating, notes, createdAt, updatedAt.
   - Decide rating representation (number 1–5 stored as integer; possibly constrain via validation schema).
   - Decide how to handle address vs direct Maps link (e.g., always store a canonical mapsUrl, with optional raw address).
   - If using a database (recommended for Vercel), define a schema:
     - For Prisma: a CoffeeShop model in schema.prisma with appropriate types.
     - For Vercel Postgres or another hosted DB: equivalent table definition.
   - Consider a minimal AdminSession or Users representation only if needed beyond a shared admin secret.

4. State management and data flow
   - Use server components for initial data fetch in app/page.tsx:
     - Fetch the list of coffee shops from the database (or from a static JSON during early development).
     - Pass the initial data into a client component (CoffeeDirectoryPage) for interactive behavior.
   - Inside the client component, manage local state for:
     - The list of coffee shops (initialized from server props, updated on create).
     - Admin authentication status.
     - Modal open/close state and current form values/errors.
   - Use simple React state (useState/useReducer) for this scope; optionally layer SWR/React Query later if you want auto-revalidation and cache.
   - Decide on the mutation model:
     - Call a server action or POST to /api/coffee-shops when adding a new shop.
     - On success, update local list state and/or revalidate data from server.

5. Admin authentication strategy (simple but not totally fake)
   - Aim for a balance between simplicity and realism:
     - Option A (simplest, mostly client-side): admin enters a shared admin password; store a flag in localStorage and in React state to show admin UI; API trusts all requests (not secure but fine for demo).
     - Option B (better demo): admin submits a password to an /api/admin/login route; on success, set an HttpOnly session cookie; UI checks auth via a small /api/admin/me or by optimistic local flag.
   - Plan to:
     - Add an “Admin Login” button (or unobtrusive icon) that opens AdminLoginForm.
     - After login, show admin-only controls (Add Coffee Shop button, maybe an “Admin” badge in header).
   - For a portfolio, prefer Option B and clearly note in README that it’s a demo/shared secret.

6. Modal and form handling
   - Build a reusable Modal component:
     - Handles backdrop, focus trap, ESC to close, accessible markup (dialog role, aria-modal, labelled by title).
     - Uses Tailwind for styling and transitions.
   - Build AddCoffeeShopModal:
     - Contains the form fields: name, mapsUrl/address, coffeeRating, wifiRating, workRating, notes.
     - Uses React Hook Form or controlled components; integrate validation (Zod or custom) to enforce required fields and rating ranges.
     - On submit:
       - Show loading state.
       - Call the create API/server action.
       - On success, close modal and update parent list state.
       - On error, display validation or server errors inline.
   - Keep modal open/close state controlled from a parent admin control component.

7. API layer and data persistence
   - Early phase (for rapid UI iteration):
     - Hard-code a small in-memory coffeeShops array in a mock repository in lib/mock-data.ts, and wire the UI to that (read-only) to focus on layout.
   - Production-ready phase:
     - Choose a persistence option compatible with Vercel:
       - Recommended: Vercel Postgres or another managed Postgres (via Prisma or direct SQL client).
       - Alternative: hosted SQLite (e.g., Turso) or Supabase.
     - Introduce a data-access layer in lib/repositories/coffeeShopsRepository.ts with functions like listCoffeeShops, createCoffeeShop.
     - Implement API route handlers under app/api/coffee-shops/route.ts:
       - GET: returns JSON list of coffee shops.
       - POST: validates body, checks admin auth (if Option B), persists record, returns created entity.
   - Ensure server-only code (DB clients, secrets) stays in server contexts (route handlers, server actions, or lib marked server-only).

8. Layout, components, and styling
   - Build AppShell layout:
     - Header with site title (e.g., “Remote-Friendly Coffee Spots”) and optional admin indicator.
     - Main content area: CoffeeShopList in a responsive grid.
     - Footer with social links to GitHub and LinkedIn.
   - Build CoffeeShopCard:
     - Show name, ratings (nicely formatted), optional notes.
     - Include a “View on Maps” link that opens Google Maps in a new tab.
     - Use Tailwind for elevation, hover/focus states, and responsive layout.
   - Build RatingDisplay component:
     - Visual representation of rating 1–5 (icons or simple dots/bars) with accessible labels.
   - Ensure dark-mode friendly colors or at least high contrast.

9. Vercel deployment considerations
   - Configure environment variables in Vercel for:
     - Database connection URL.
     - Admin shared secret/password.
   - Set up any necessary seed script for initial coffee shops (e.g., a small script run locally or via a one-off Vercel function invocation).
   - Verify that API routes and database connections work correctly in the Vercel environment.
   - Confirm that dynamic data (added shops) persists across deployments.

10. Optional enhancements (portfolio quality)

- UX/UI polish:
  - Add filtering/sorting (e.g., by rating or WiFi strength).
  - Add tags for outlets, noise level, or opening hours.
  - Show average ratings or badges (e.g., “Great WiFi”).
- Performance and DX:
  - Use static generation with incremental revalidation if you switch to a read-mostly public view.
  - Add basic unit tests for core components (CoffeeShopCard, RatingDisplay) and integration tests for the add-flow.
- Content and documentation:
  - Write a clear README explaining architecture choices, trade-offs (e.g., simple auth), and how to run locally.
  - Add screenshots and a short Loom walkthrough for your portfolio.

**Relevant files**

- app/page.tsx — Main page; server component fetching initial data and rendering the directory.
- app/layout.tsx — Global layout wrapper; can integrate AppShell or basic HTML structure.
- components/layout/AppShell.tsx — Shared header, main, and footer wrapper.
- components/coffee/CoffeeDirectoryPage.tsx — Client component orchestrating list, admin state, and modal.
- components/coffee/CoffeeShopList.tsx — Renders a grid/list of CoffeeShopCard from props.
- components/coffee/CoffeeShopCard.tsx — Card UI for a single coffee shop.
- components/admin/AdminControls.tsx — Shows admin-only controls (Add button, maybe logout).
- components/admin/AddCoffeeShopModal.tsx — Modal wrapper + form for creating a new coffee shop.
- components/admin/AdminLoginForm.tsx — Simple login form for shared-secret admin auth.
- components/common/Modal.tsx — Reusable accessible modal.
- components/common/Button.tsx — Styled button component used across the app.
- components/common/RatingDisplay.tsx — Visual rating display.
- components/layout/Footer.tsx — Footer with GitHub/LinkedIn links.
- lib/types.ts — TypeScript types and interfaces for core domain models.
- lib/validation.ts — Validation logic/schemas for create-coffee-shop input.
- lib/repositories/coffeeShopsRepository.ts — Data-access abstraction over DB or mock data.
- app/api/coffee-shops/route.ts — Route handlers for listing and creating coffee shops.
- app/api/admin/login/route.ts — Optional login route for admin authentication.

**Verification**

1. Local dev checks
   - Run the dev server and verify:
     - Coffee shop list renders with initial seed data.
     - Cards show correct information and Maps links open correctly.
     - Footer links open your GitHub and LinkedIn profiles.
   - As admin (after login or password entry):
     - Admin-only button appears.
     - Clicking it opens the modal; form validation works (e.g., rating out of range is rejected).
     - Successful submissions append a new card without full-page reload.

2. API & persistence checks
   - Hit GET /api/coffee-shops manually (browser or curl) to confirm JSON structure.
   - POST valid and invalid payloads to /api/coffee-shops to validate error handling and auth checks.
   - Verify that new entries persist after server restarts and Vercel redeploys.

3. Deployment checks on Vercel
   - After deploy, repeat core user and admin flows.
   - Confirm environment variables are read correctly and that there are no CORS or URL issues.
   - Inspect logs for DB or auth-related errors.

**Decisions**

- Use Next.js App Router with a single main page and a small, well-organized components and lib layer to keep concerns separated.
- Prefer a real database (e.g., Vercel Postgres or similar) for portfolio realism, while starting UI development against mock data for speed.
- Implement a simple shared-secret-based admin auth to balance simplicity and demonstration of real-world patterns.
- Keep state management local to the page (React state and props) and only introduce heavier tools (SWR/React Query) if you later add more complex data flows.

**Further Considerations**

1. Database choice: Do you want to lean into Vercel’s own Postgres offering for tight integration, or would you prefer a simpler SQLite/Turso setup to avoid managing full Postgres?
2. Auth depth: For this project’s scope, is a shared secret enough for you, or do you want to practice integrating a more realistic provider (e.g., NextAuth with GitHub/Google login for admin)?
3. Testing scope: Are you interested in adding tests now (component + API route tests) as part of learning, or keep that as a follow-up enhancement once the core app works?
