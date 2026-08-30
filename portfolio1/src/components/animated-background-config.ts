export type Section = "hero" | "about" | "skills" | "experience" | "projects" | "contact";

export const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.22, y: 0.22, z: 0.22 },
      position: { x: 220, y: -60, z: 0 },
      rotation: { x: 0.48, y: -0.58, z: 0.26 },
    },
    mobile: {
      scale: { x: 0.24, y: 0.24, z: 0.24 },
      position: { x: 0, y: -160, z: 0 },
      rotation: { x: 0.48, y: -0.58, z: 0.26 },
    },
  },
  about: {
    desktop: {
      scale: { x: 0.30, y: 0.30, z: 0.30 },
      position: { x: 0, y: -30, z: 0 },
      rotation: {
        x: 0.50,
        y: -0.50,
        z: 0.24,
      },
    },
    mobile: {
      scale: { x: 0.26, y: 0.26, z: 0.26 },
      position: { x: 0, y: -30, z: 0 },
      rotation: {
        x: 0.50,
        y: -0.50,
        z: 0.24,
      },
    },
  },
  experience: {
    desktop: {
      scale: { x: 0.22, y: 0.22, z: 0.22 },
      position: { x: 240, y: -40, z: 0 },
      rotation: {
        x: 0.45,
        y: -0.65,
        z: 0.25,
      },
    },
    mobile: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 0, y: 120, z: 0 },
      rotation: {
        x: 0.45,
        y: -0.65,
        z: 0.25,
      },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.32, y: 0.32, z: 0.32 },
      position: { x: 0, y: -20, z: 0 },
      rotation: {
        x: 0.52,
        y: -0.48,
        z: 0.24,
      },
    },
    mobile: {
      scale: { x: 0.28, y: 0.28, z: 0.28 },
      position: { x: 0, y: -20, z: 0 },
      rotation: {
        x: 0.52,
        y: -0.48,
        z: 0.24,
      },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.22, y: 0.22, z: 0.22 },
      position: { x: -240, y: -40, z: 0 },
      rotation: {
        x: 0.45,
        y: -0.45,
        z: 0.22,
      },
    },
    mobile: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 0, y: 120, z: 0 },
      rotation: {
        x: 0.45,
        y: -0.45,
        z: 0.22,
      },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 300, y: -180, z: 0 },
      rotation: {
        x: 0.48,
        y: -0.58,
        z: 0.26,
      },
    },
    mobile: {
      scale: { x: 0.20, y: 0.20, z: 0.20 },
      position: { x: 0, y: 140, z: 0 },
      rotation: {
        x: 0.48,
        y: -0.58,
        z: 0.26,
      },
    },
  },
};

export const getKeyboardState = ({
  section,
  isMobile,
}: {
  section: Section;
  isMobile: boolean;
}) => {
  const baseTransform = STATES[section][isMobile ? "mobile" : "desktop"];

  const getScaleOffset = () => {
    const width = window.innerWidth;
    // Reference widths for "ideal" size
    // Using 1024 for desktop to maintain backward compatibility with previous look
    const DESKTOP_REF_WIDTH = 1280;
    const MOBILE_REF_WIDTH = 390;

    const targetScale = isMobile
      ? width / MOBILE_REF_WIDTH
      : width / DESKTOP_REF_WIDTH;

    // Clamp values to prevent extremes
    const minScale = isMobile ? 0.5 : 0.5;
    const maxScale = isMobile ? 0.6 : 1.15;

    return Math.min(Math.max(targetScale, minScale), maxScale);
  };

  const scaleOffset = getScaleOffset();

  return {
    ...baseTransform,
    scale: {
      x: Math.abs(baseTransform.scale.x * scaleOffset),
      y: Math.abs(baseTransform.scale.y * scaleOffset),
      z: Math.abs(baseTransform.scale.z * scaleOffset),
    },
  };
};
