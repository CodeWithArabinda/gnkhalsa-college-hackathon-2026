# StackFolio - Product Requirements Document (PRD)

## 1. Executive Summary
**Product Name:** StackFolio (by Team Stack Attack)  
**Tagline:** Turn your static resume into an interactive, shareable portfolio in minutes.  
**Core Value Proposition:** StackFolio transforms career data locked inside static PDF resumes into a structured, editable, responsive, and publicly shareable digital portfolio—without requiring the user to write code or design layouts.

---

## 2. Problem Statement & Market Opportunity
College students, freshers, and early-career job seekers accumulate valuable projects, skills, and certifications. However, this information remains trapped in static 1–2 page PDF resumes.
- Static resumes cannot showcase live web applications, GitHub repos, or interactive media.
- Building a personal portfolio from scratch requires web development skills, design experience, domain purchasing, and hosting setup.
- Existing generic website builders are either overly complex (drag-and-drop fatigue) or rigid (non-editable automated exports).

StackFolio bridges this gap by offering guided intake (PDF upload or manual builder), structured editing, professional dual templates, real-time readiness feedback, and a permanent public link.

---

## 3. User Personas
### Primary Persona: Aarya Shah (Final-Year BCA Student)
- **Background:** 20 years old, actively applying for software engineering internships.
- **Pain Point:** Has 3 React projects and multiple certifications on GitHub and Drive, but recruiters only see plain text on her PDF resume.
- **Goal:** Transform her resume into a live, professional portfolio link (`/p/aarya-shah-r4x9`) to share on LinkedIn and job applications.

### Secondary Persona: Rohan Patil (Student Freelancer)
- **Background:** 22 years old, freelance frontend developer and UI enthusiast.
- **Pain Point:** No time to design a personal website from scratch; needs to showcase live URLs and project screenshots quickly.
- **Goal:** Continuously update project cards and share a clean corporate or developer layout with prospective clients.

### Tertiary Persona: Placement Cell Coordinator / Recruiter
- **Background:** College training and placement officer evaluating hundreds of student submissions.
- **Pain Point:** Inconsistent resume formatting makes evaluating practical coding competence time-consuming.
- **Goal:** Standardized, mobile-friendly portfolio pages with direct links to live demos and GitHub repositories.

---

## 4. Product Flow & Core User Journey
1. **Landing Page:** Value proposition, live template preview previews, and one-click "Get Started" CTA.
2. **Authentication:** Supabase Email/Password login or registration.
3. **Intake Flow:** 
   - Option A: Upload Resume PDF (assisted text extraction draft).
   - Option B: Manual Profile Builder.
   - Option C: "Try Demo Profile" (1-click pre-fill for rapid hackathon testing).
4. **Structured Review & Editor:** Multi-tab dashboard to edit Personal Info, About, Experiences, Education, Projects, Skills, and Achievements.
5. **Template Customization:** Instant toggle between Dark Developer and Light Corporate layouts.
6. **Device Preview:** Live interactive preview toggleable between Desktop (1280px) and Mobile (390px) SVG frames.
7. **Readiness Evaluation:** Real-time calculation of Portfolio Readiness Score (0-100) with actionable recommendations.
8. **Publish & Permanent Link:** Publish toggle generates a permanent unique slug (`/p/:public_slug`).
9. **Continuous Updates:** Subsequent edits update the live content at the existing stable URL without breaking references.

---

## 5. Scope Boundaries (MVP vs Out-of-Scope)

| In-Scope (Hackathon MVP) | Out-of-Scope (Future Scope) |
| :--- | :--- |
| Supabase Auth (Email/Password) | Paid subscription tiers & payment gateways |
| Resume PDF upload & storage in Supabase | 100% universal OCR parsing for complex layouts |
| Manual structured multi-section form editor | Complex drag-and-drop layout canvas builder |
| 2 Polished templates (Dark Dev & Light Corp) | Third-party LinkedIn OAuth sync |
| SVG Desktop (1280px) & Mobile (390px) preview toggle | Visitor analytics dashboards & heatmaps |
| Permanent stable slug (`/p/:public_slug`) | Custom CNAME domain routing |
| Dynamic 0-100 Portfolio Readiness Score | Real-time multi-user team collaboration |
| Publish / Unpublish visibility guard | Automated email notification queues |

---

## 6. Portfolio Readiness Score Specification
The readiness score is calculated deterministically on the client using a 100-point rubric:

$$\text{Readiness Score} = \min\left(100, \sum \text{Completed Criteria}\right)$$

| Criteria | Weight | Validation Rule | Actionable Suggestion |
| :--- | :--- | :--- | :--- |
| **Headline & Name** | 10 pts | `full_name.trim().length > 2` and `headline.trim().length > 5` | "Add a clear professional headline (e.g. Full-Stack Developer)." |
| **About Bio** | 10 pts | `bio.trim().length >= 50` | "Expand your bio to at least 50 characters to improve recruiter trust." |
| **Contact / Social Link** | 10 pts | At least 1 valid URL in `github_url`, `linkedin_url`, or `email` | "Add your GitHub or LinkedIn profile link." |
| **Education Record** | 10 pts | Count of `education` rows $\ge 1$ | "Add your current university or college degree." |
| **Project Presence** | 20 pts | Count of `projects` rows $\ge 1$ | "Add at least one project showcasing your practical abilities." |
| **Project Live/Repo Links** | 15 pts | At least 1 project has `github_url` or `live_url` populated | "Attach a GitHub repo or live demo link to your projects." |
| **Skills Breadth** | 10 pts | Count of `skills` rows $\ge 5$ | "List at least 5 core technical or soft skills." |
| **Achievements/Certificates** | 10 pts | Count of `achievements` rows $\ge 1$ | "Add an achievement, certificate, or academic honor." |
| **Profile Photo** | 5 pts | `profile_image_url` is non-empty | "Upload a clear profile picture to personalize your page." |

---

## 7. Permanent Public URL Rule
- Format: `/p/:public_slug` (e.g., `/p/aarya-shah-r4x9`)
- Public slugs are generated once upon profile initialization using sanitized full name plus a 4-character cryptographic hash/random alphanumeric suffix.
- Content updates must never alter or recreate the URL slug. Recruiters, resumes, and social profiles retain a permanent working link.
