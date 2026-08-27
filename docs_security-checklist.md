# StackFolio - Security & Privacy Checklist

## 1. Access Control & Row Level Security (RLS)
- [x] **Enforce RLS on All Tables:** `profiles`, `experiences`, `education`, `projects`, `skills`, `achievements`, `resume_uploads`, `portfolio_feedback`.
- [x] **Public Read Isolation:** Anonymous/public visitors can only read profile data where `profiles.is_published = true`.
- [x] **Owner Write Isolation:** Mutation operations (`INSERT`, `UPDATE`, `DELETE`) require `auth.uid() = user_id`.
- [x] **Private Buckets:** Resume PDF uploads stored in private storage bucket with signed URL access.

## 2. API & Secret Key Management
- [x] **Client Secret Protection:** Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exposed in client bundles.
- [x] **Service Role Secret Lockdown:** Supabase `service_role` master key is strictly prohibited from frontend code or Git commits.
- [x] **Environment Variable Hygiene:** `.env` added to `.gitignore`; `.env.example` provided for safe repository cloning.

## 3. Data Validation & Injection Prevention
- [x] **URL Protocol Sanitization:** All user-supplied links (`github_url`, `live_url`, `linkedin_url`) validated to start with `https://` or `http://` to prevent `javascript:` XSS payloads.
- [x] **Unique Public Slug Constraint:** Database-enforced `UNIQUE` index on `public_slug` to eliminate namespace collisions and route hijacking.
- [x] **File Upload Restrictions:** Storage buckets restrict file types (PDF $\le 5$MB for resumes, PNG/JPEG/WEBP $\le 2$MB for avatars).
