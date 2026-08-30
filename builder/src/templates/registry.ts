import React from "react";
import { TemplateMetadata } from "../types/portfolio";

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  {
    id: "dark_developer",
    name: "Dark Developer 3D",
    category: "Developer",
    description: "Cyberpunk dark mode with glowing accents, interactive tech stack matrix, and terminal aesthetic.",
    badge: "Most Popular",
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    accentColor: "#8b5cf6",
    tags: ["Dark Mode", "3D Elements", "Cyberpunk", "Developer"],
    author: "Portfolio 1 & 3 Engine",
    targetPortfolioFolder: "portfolio1",
  },
  {
    id: "glass_modern",
    name: "Glass Modern Space",
    category: "Glassmorphism",
    description: "Nebula cosmic backdrop, translucent glass cards, smooth glowing gradients, and floating badges.",
    badge: "Trending",
    previewImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    accentColor: "#06b6d4",
    tags: ["Glassmorphism", "Space", "Cosmic", "Interactive"],
    author: "Portfolio 3 Universe Engine",
    targetPortfolioFolder: "portfolio3",
  },
  {
    id: "minimalist_clean",
    name: "Minimalist Clean",
    category: "Minimalist",
    description: "Swiss editorial typography, high-contrast monochrome layout, and uncluttered content hierarchy.",
    badge: "Clean & Fast",
    previewImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    accentColor: "#10b981",
    tags: ["Monochrome", "Editorial", "Minimal", "Fast"],
    author: "Portfolio 2 Minimal Engine",
    targetPortfolioFolder: "portfolio2",
  },
  {
    id: "light_corporate",
    name: "Executive Light Pro",
    category: "Corporate",
    description: "Clean enterprise aesthetic, structured case studies, trust metrics, and polished white-collar layout.",
    badge: "Professional",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    accentColor: "#3b82f6",
    tags: ["Corporate", "Executive", "Light", "Clean"],
    author: "Enterprise Engine",
    targetPortfolioFolder: "portfolio4",
  },
  {
    id: "creative_playful",
    name: "Creative & Playful",
    category: "Creative",
    description: "Vibrant retro gradients, expressive badges, hand-drawn doodle accents, and friendly typography.",
    badge: "Creative",
    previewImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    accentColor: "#ec4899",
    tags: ["Vibrant", "Creative", "Doodles", "Playful"],
    author: "Portfolio 5 Next.js Engine",
    targetPortfolioFolder: "portfolio5",
  },
];

export function getTemplateMetadata(templateId: string): TemplateMetadata {
  const match = TEMPLATE_REGISTRY.find((t) => t.id === templateId);
  return match || TEMPLATE_REGISTRY[0];
}
