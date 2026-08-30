# Nilesh Gupta - 3D React & Framer Motion Portfolio (Portfolio 3)

An interactive, responsive 3D developer portfolio featuring real-time 3D models, smooth physics particle canvas, an ambient glowing aurora motion background, and a clean professional dark-theme look.

## 🚀 Technologies Used
- **Frontend Core**: React (v18), TypeScript, Vite
- **Styling**: TailwindCSS
- **3D Graphics**: Three.js, React Three Fiber (R3F), @react-three/drei (for 3D Earth and Camera Controls)
- **Animations**: Framer Motion (GPU hardware-accelerated animations)
- **Forms**: EmailJS (Contact form mail delivery integration)

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed.

### 1. Navigate to the project directory:
```bash
cd portfolio3
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Run the development server:
```bash
npm run dev
```

### 4. Build for production:
```bash
npm run build
```

### 5. Preview production build:
```bash
npm run preview
```

## 📂 Project Structure
- `src/components/canvas`: Three.js Canvas components (Earth, Stars particle system).
- `src/components/sections`: Landing page modules (Hero, About, Projects, Tech, Contact, Footer).
- `src/constants`: Configuration files containing Nilesh's bio, tech skills list, project highlights, and styling constants.
- `src/hoc`: Higher-Order Components for layout styling and wrapper spacing.
