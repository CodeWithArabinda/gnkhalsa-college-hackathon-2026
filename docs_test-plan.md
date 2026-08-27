# StackFolio - Quality Assurance & Test Plan

## 1. Test Matrix

| ID | Test Scenario | Execution Steps | Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | User Registration & Profile Initialization | 1. Sign up with new email.<br>2. Complete auth flow. | User row in `auth.users`; profile initialized with unique `public_slug`. | Pass |
| **TC-02** | Manual Project Addition & Deletion | 1. Navigate to Projects tab.<br>2. Add "CloudIDE" with GitHub link.<br>3. Delete item. | Item persists to database, renders in preview, and deletes cleanly. | Pass |
| **TC-03** | Readiness Score Dynamic Increment | 1. Start with initial 45-point profile.<br>2. Add 5 skills and 1 GitHub link. | Score increases from 45 to 70; suggestions list updates in real time. | Pass |
| **TC-04** | Desktop to Mobile SVG Preview Switcher | 1. Click Mobile SVG toggle in preview header. | Container adjusts to 390px phone frame without horizontal scroll breakage. | Pass |
| **TC-05** | Instant Template Theme Swap | 1. Change template dropdown from Dark Dev to Light Corp. | Instant CSS swap without full page re-render or data loss. | Pass |
| **TC-06** | Stable Public Slug Persistence | 1. Publish profile with slug `aarya-shah-r4x9`.<br>2. Edit bio text.<br>3. Revisit `/p/aarya-shah-r4x9`. | Public URL remains identical; content renders updated bio. | Pass |
| **TC-07** | RLS Security Guard for Private Drafts | 1. Attempt unauthenticated fetch of unpublished profile via API. | Query returns zero rows or RLS permission error. | Pass |
| **TC-08** | Unpublished Route 404 Guard | 1. Toggle `is_published` to `false`.<br>2. Open `/p/:slug` in incognito window. | Page displays "This portfolio is currently unpublished or private". | Pass |
| **TC-09** | Profile Avatar Image Upload | 1. Upload 1.5MB PNG file in Basic Info tab. | File uploads to Supabase `avatars` bucket; image updates in preview. | Pass |
| **TC-10** | Demo Profile 1-Click Intake | 1. Click "Try Demo Profile" on onboarding. | Populates complete Aarya Shah dataset into editor fields immediately. | Pass |
