export function generateSlug(fullName) {
  if (!fullName) return `user-${Math.random().toString(36).substring(2, 6)}`;
  const sanitized = fullName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${sanitized}-${suffix}`;
}
