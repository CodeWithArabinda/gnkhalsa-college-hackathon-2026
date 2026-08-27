# StackFolio - AI Agent Rules & Engineering Directives

## 1. Project Overview & Scope Lock
- **Application:** StackFolio (Resume to Interactive Portfolio Generator).
- **Target Stack:** React 18, Vite, Tailwind CSS, Supabase (Auth, Postgres, Storage), Vercel.
- **Scope Boundary:** Maintain strict focus on approved hackathon deliverables. Do not introduce backend servers (Node/Express), Redis, GraphQL, payment gateways, or third-party OAuth complexity.

---

## 2. Architectural Invariants
1. **Single-Source Component Principle:**
   - Always use `<TemplateRenderer portfolio={data} />` for both the Dashboard Live Preview and Public `/p/:public_slug` route.
   - Do not maintain separate JSX component trees for desktop and mobile preview. Handle device preview strictly by altering the parent container wrapper dimensions (`1280px` vs `390px`).
2. **Stable Slug Immutability:**
   - The public URL route must always follow `/p/:public_slug`.
   - Content updates must update the existing record matching `user_id` or `id`; never generate a new slug on normal content saves.
3. **Database Schema Integrity:**
   - Adhere strictly to the column names and table relationships defined in `database-schema.md`.
   - Maintain `user_id` foreign keys to `auth.users(id)` and child table `profile_id` foreign keys to `profiles(id)`.

---

## 3. Code Quality & Implementation Standards
- Use functional React components with standard hooks (`useState`, `useEffect`, `useContext`, `useMemo`).
- Provide explicit loading and error fallback states for all Supabase asynchronous queries.
- Ensure Tailwind CSS classes adhere to the color design tokens specified in `design.md`.
