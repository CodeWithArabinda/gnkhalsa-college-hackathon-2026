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
| **TC-11** | Valid PDF Resume Processing via Python OCR API | 1. Upload valid 1-page PDF resume.<br>2. Trigger OCR extraction. | Python OCR API parses document via PyMuPDF fast-path (<150ms), returns PortfolioDraft, adapter transforms schema, populates Studio Editor. | Pass |
| **TC-12** | Scanned / Low-Quality PDF OCR Fallback | 1. Upload scanned image-based PDF resume. | Extraction Quality Engine detects low score (<0.65), triggers Unlimited-OCR adapter fallback, parses text, populates Studio Editor. | Pass |
| **TC-13** | Unsupported File Format Handling | 1. Attempt to upload .docx or non-PDF file. | Client validation blocks upload with clear error: "Invalid file format. The StackFolio OCR Engine supports PDF documents (.pdf)." | Pass |
| **TC-14** | Oversized PDF File Validation (>5MB) | 1. Select a 7MB PDF file. | Client & server validation enforce 5MB limit and reject file. | Pass |
| **TC-15** | Python OCR Service Offline / Network Error | 1. Stop Python OCR server.<br>2. Upload resume PDF. | Catch network error and display: "Unable to connect to StackFolio OCR Model API... Please verify the Python API server is running." | Pass |

