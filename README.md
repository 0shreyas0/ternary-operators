<div align="center">
  <img src="./public/disney-castle-logo.svg" alt="Walt Disney Redesigned" width="120" />

  # 🏰 Disney Interactive Experience 

  *A modern, highly engaging web application honoring the magical world of Disney.*

  [**✨ View Live Demo ✨**](https://walt-disney-redesigned.vercel.app/)

  ---

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-white?style=for-the-badge&logo=framer&logoColor=black)
  ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

<br/>

## 🌟 About The Project

Welcome to the **Disney Interactive Experience**! This project is a dynamic tribute to the magical worlds of Disney, Marvel, Star Wars, and Pixar. Featuring deep interactive elements, smooth scrolling, Easter eggs, and a hidden princess mini-game, this application pushes the boundaries of modern web animations that feel incredibly immersive. The complex 3D animations in this application are achieved with raw CSS/DOM 3D transforms (`transformStyle: "preserve-3d"`) ensuring the animation is lightweight overall. 

> **Note**: For the best interactive experience, please check out the live demo [here](https://walt-disney-redesigned.vercel.app/). 

## ✨ Core Features

### 🎮 Custom Interactions & Physics
- **Ralph Chaser Cursor**: Wreck-It Ralph physically follows your cursor across the screen! Based on your movement speed and proximity to hidden items, Ralph features custom 2D sprite sheet animations (walking, idling, and wrecking) with a physics-based delayed follow!
- **Interactive Physics**: Elements spring, jump, and bounce to life using `matter-js`, mapped directly into the React DOM.
- **SplitText Navigation**: Mesmerizing character-by-character animation effects on headers and menus.
- **Dynamic Counters**: Numbers animate dynamically using a custom `CountUp` logic as they scroll into view.

### 📖 Immersive CSS 3D Preloader
The experience begins with a stunning **3D preloader** featuring an interactive and magical book animation crafted entirely out of DOM elements and CSS `preserve-3d` layered magically with **GSAP** timelines.

### 🎢 Smooth Scrolling & Parallax Effects
We utilize **Lenis** for buttery smooth, momentum-based scrolling. Combined with **GSAP** and **Framer Motion**, elements like the Hero Section feature parallax starfields and scroll-linked animations that bring the page to life.

### 🕹️ "Hidden Princess" Mini-Game
Scattered throughout the site are hidden princesses! 
* Explore the page to find them.
* Your progress is tracked in a persistent **Collection HUD**.
* Fully gamifies the browsing experience!

## 🎦 Exploring the Worlds

- **Hero Section:** A captivating full-screen introduction featuring custom Disney branding and autoplaying video backgrounds.
- **Hero Carousel:** A beautifully animated carousel showcasing Disney's rich history.
- **Franchise Worlds:** Interactive animated cards dedicated to the cinematic universes (Marvel, Star Wars, Pixar).
- **Film Reel:** A scrolling cinematic reel of classic Disney films.
- **Disney+ & Merch:** Dedicated immersive sections for streaming content and merchandise.
- **Theme Parks:** A vibrant section celebrating Disney Parks around the world.

## 🛠️ Technology Stack

This application is built with performance and visual excellence in mind:

| Category | Technologies |
| -------- | ------------ |
| **Framework** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Custom Glassmorphism UI |
| **Animations** | GSAP, Framer Motion, Matter.js Physics |
| **Scrolling** | Lenis Scroll |

## 🚀 Getting Started Locally

To get this project up and running on your local machine, follow these simple steps:

### Prerequisites
* Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
* `npm`, `yarn`, or `pnpm` for managing dependencies.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0shreyas0/disney-app.git
   ```
2. **Navigate to the directory**
   ```bash
   cd disney-app
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```
5. **Open in Browser**
   Visit `http://localhost:5173` to experience the magic!

## 📜 Scripts

* `npm run dev`: Starts the Vite development server.
* `npm run build`: Compiles TypeScript and builds the app for production.
* `npm run lint`: Runs ESLint to ensure code quality.
* `npm run preview`: Locally preview the production build.

<br/>

<div align="center">
  <p>Made with ❤️ and ✨ Magic</p>
</div>
