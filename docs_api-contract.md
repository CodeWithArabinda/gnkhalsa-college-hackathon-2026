# StackFolio - API & Data Contract Specification

StackFolio interfaces directly with Supabase via `@supabase/supabase-js`. Below are the client contracts and payload definitions.

---

## 1. Authentication Endpoints

### 1.1 Sign Up
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'aarya@example.com',
  password: 'SecurePassword123!',
  options: {
    data: { full_name: 'Aarya Shah' }
  }
});
```

### 1.2 Sign In
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'aarya@example.com',
  password: 'SecurePassword123!'
});
```

---

## 2. Profile Management

### 2.1 Fetch Complete User Portfolio (Authenticated Workspace)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select(`
    *,
    experiences (*),
    education (*),
    projects (*),
    skills (*),
    achievements (*)
  `)
  .eq('user_id', user.id)
  .single();
```

### 2.2 Fetch Public Portfolio by Slug (`/p/:public_slug`)
```javascript
const { data, error } = await supabase
  .from('profiles')
  .select(`
    full_name,
    headline,
    bio,
    profile_image_url,
    location,
    email,
    github_url,
    linkedin_url,
    selected_template,
    experiences (*),
    education (*),
    projects (*),
    skills (*),
    achievements (*)
  `)
  .eq('public_slug', publicSlug)
  .eq('is_published', true)
  .single();
```
- **Success (200):** Returns complete nested portfolio object.
- **Unpublished / Missing (404):** Returns `data: null`. Frontend displays graceful 404/Unpublished message.

### 2.3 Update Profile Metadata & Publishing State
```javascript
const { data, error } = await supabase
  .from('profiles')
  .update({
    full_name: 'Aarya Shah',
    headline: 'Full-Stack Developer & Open-Source Contributor',
    bio: 'BCA student passionate about modern web apps, distributed systems, and clean UI.',
    selected_template: 'dark_developer',
    is_published: true
  })
  .eq('id', profileId)
  .select();
```

---

## 3. Child Table Mutations (Projects, Skills, Education)

### 3.1 Insert New Project
```javascript
const { data, error } = await supabase
  .from('projects')
  .insert([{
    profile_id: profileId,
    title: 'CloudIDE',
    description: 'A browser-based code editor with real-time compilation.',
    technologies: ['React', 'WebAssembly', 'Node.js', 'Tailwind'],
    github_url: 'https://github.com/aaryashah/cloud-ide',
    live_url: 'https://cloudide.demo.com',
    display_order: 1
  }])
  .select();
```

### 3.2 Update Project
```javascript
const { data, error } = await supabase
  .from('projects')
  .update({
    title: 'CloudIDE Pro',
    github_url: 'https://github.com/aaryashah/cloudide-pro'
  })
  .eq('id', projectId);
```

### 3.3 Delete Project
```javascript
const { error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

---

## 4. Storage Bucket Contracts

### 4.1 Profile Avatar Upload
```javascript
// Bucket: 'avatars' (Public)
const filePath = `${profileId}/avatar-${Date.now()}.${fileExt}`;
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(filePath, file, { upsert: true });

const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath);
```

### 4.2 Resume PDF Storage
```javascript
// Bucket: 'resumes' (Private)
const filePath = `${profileId}/resume-${Date.now()}.pdf`;
const { data, error } = await supabase.storage
  .from('resumes')
  .upload(filePath, file);
```
