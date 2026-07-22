# Accredian Enterprise Landing Page Clone

A premium, high-fidelity recreation of the **Accredian Enterprise** landing page, reimagined with a modern editorial SaaS aesthetic while preserving the original information architecture and user experience.

This project was built as part of the **Full Stack Developer Intern** evaluation and focuses on creating a production-quality frontend with smooth interactions, polished animations, responsive layouts, and clean component architecture.

---

## 🔗 Live Demo

- **Live Website:** https://your-vercel-url.vercel.app
- **GitHub Repository:** https://github.com/your-username/accredian-enterprise-clone

> Replace the above URLs with your actual deployment and repository links.

---

# 📖 Overview

Instead of creating a pixel-perfect duplicate, this project takes inspiration from the original Accredian Enterprise landing page and redesigns it using a premium editorial design system.

The objective was to maintain the original structure while significantly improving visual polish, animations, responsiveness, accessibility, and overall user experience.

The landing page has been developed using **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, with an emphasis on reusable components and maintainable architecture.

---

# ✨ Features

## 🎨 Premium Editorial Design System

- Warm cream background (`#FAFAF8`)
- Near-black typography (`#14161A`)
- Soft neutral gray supporting text
- Editorial-inspired spacing
- Glassmorphism surfaces
- Large rounded cards
- Section-specific ambient blurred gradients
- Light mode only

---

## ⚡ Elegant Page Preloader

- Animated logo spinner
- Progress loading indicator
- Smooth fade transition
- Automatically completes in approximately one second

---

## 🧊 Floating Glass Header

The navigation bar includes:

- Floating frosted glass effect
- Ambient breathing glow animation
- Scroll-based shrinking header
- Animated navigation underline
- Logo rotation on hover
- Sticky positioning
- Responsive navigation

### Command Palette

A fully keyboard-accessible search modal that includes:

- ⌘ K / Ctrl K shortcut
- React Portal rendering
- Keyboard navigation
- Search filtering
- Focus management

---

## 🚀 Interactive Hero Section

- Animated eyebrow badge
- Staggered content entrance
- Scroll-linked product mockup scaling
- Hover interactions
- Smooth motion effects
- CTA animations

---

## 🤝 Infinite Partner Marquee

- Infinite GPU accelerated animation
- Hover pause
- Responsive layout
- Continuous seamless scrolling

---

## 🧩 3D Bento Grid

Feature cards include:

- Bento layout
- Scroll-triggered reveal
- Perspective transforms
- 3D tilt animation
- Responsive stacking
- Motion-safe animations

---

## 📈 Interactive Method Timeline

### Desktop

- Horizontal stepper
- Active progress tracking
- Animated accordion
- Shared layout transitions

### Mobile

- Vertical accordion
- Touch-friendly interactions
- Optimized responsive layout

---

## 🎯 Premium CTA Buttons

Custom button component featuring:

- Pill styling
- Animated sheen sweep
- Coordinate-based ripple animation
- Specular reflection
- Hover lift
- Reduced-motion support

---

## 📝 Lead Capture Form

Interactive enterprise inquiry form featuring:

- Floating labels
- Live validation
- Shake animations
- SVG checkmark animation
- Confetti success animation
- Client-side validation
- API integration

---

## 📊 Admin Dashboard

Located at:

```
/admin
```

Dashboard features include:

- Total lead count
- Enterprise inquiry statistics
- Search filters
- Query logs
- Local persistence

---

# 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| API | Next.js Route Handlers |
| Data Storage | Local JSON File |
| Package Manager | npm |

---

# 📂 Project Structure

```
app/
│
├── admin/
├── api/
│   ├── lead/
│   └── leads/
│
├── components/
│
├── sections/
│
├── hooks/
│
├── lib/
│
├── public/
│
└── styles/
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/your-username/accredian-enterprise-clone.git
```

```bash
cd accredian-enterprise-clone
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## Type Checking

```bash
npx tsc --noEmit
```

---

## Production Build

```bash
npm run build
```

---

## Start Production Server

```bash
npm start
```

---

# 🧠 Development Process

The project was developed incrementally using a component-first approach.

### Phase 1

- Project setup
- Tailwind configuration
- Design tokens
- Typography system
- Layout primitives

### Phase 2

Core reusable components

- Buttons
- Cards
- Containers
- Sections
- Navigation
- Hero

### Phase 3

Interactive sections

- Marquee
- Bento Grid
- Timeline
- Lead Form

### Phase 4

Animations

- Motion choreography
- Scroll interactions
- Ripple system
- Sheen effects
- Reflections

### Phase 5

Backend

- API routes
- JSON persistence
- Admin dashboard
- Lead management

---

# 🎯 UI & UX Highlights

- Premium editorial SaaS aesthetic
- Clean typography hierarchy
- Responsive across all devices
- Motion-safe animations
- Reduced motion accessibility
- Smooth page transitions
- Consistent spacing system
- Soft shadows and gradients
- High readability

---

# ♿ Accessibility

The project includes several accessibility improvements:

- Keyboard navigable components
- Focus indicators
- Reduced motion support
- Semantic HTML
- Proper heading hierarchy
- Accessible forms
- High contrast typography

---

# 🤖 AI Usage

This project was developed using a collaborative workflow between AI-assisted development and manual engineering.

## AI Assistance

### Google Antigravity

Used for:

- Initial project scaffolding
- Tailwind configuration
- Component boilerplates
- API route generation
- Build validation

### Claude

Used for:

- Motion timing curves
- Cubic-bezier refinements
- CSS animation ideas
- Ripple coordinate calculations
- Form validation improvements

---

## Manual Engineering

The following parts were implemented or significantly improved manually.

### Command Palette Portal

Resolved stacking context issues by rendering the search modal directly into `document.body` using React Portals, preventing clipping caused by transformed parent containers.

---

### Premium Button Reflection

Completely redesigned the reflection implementation to mirror the actual button surface instead of only reflecting text.

---

### Responsive Navigation

Improved navigation behavior by:

- Adjusting responsive breakpoints
- Refining spacing
- Preventing overlap
- Improving tablet layouts

---

### Motion Accessibility

Added explicit reduced-motion fallbacks for:

- Infinite pulse animations
- Sheen sweeps
- Ripple effects
- Card tilt animations
- Continuous loops

---

# 📦 API Routes

## Submit Lead

```
POST /api/lead
```

Stores enterprise inquiry data inside the local JSON datastore.

---

## Fetch Leads

```
GET /api/leads
```

Returns all submitted enterprise inquiries for the admin dashboard.

---

# 🔮 Future Improvements

Given additional development time, the following enhancements would be implemented:

### Database

- PostgreSQL
- MongoDB
- Prisma ORM

---

### Authentication

- NextAuth
- Clerk
- Protected Admin Dashboard

---

### Dynamic Routing

```
/programs/[slug]
```

Detailed pages for every enterprise program.

---

### Notifications

- Resend
- Slack Webhooks
- Discord Webhooks
- Email Notifications

---

### Analytics

- Dashboard Charts
- Visitor Analytics
- Conversion Funnel
- Lead Source Tracking

---

### Performance

- Server-side caching
- Image optimization
- Lazy loading
- Route prefetching
- Lighthouse optimization

---

# 📈 Learning Outcomes

Through this project I gained hands-on experience with:

- Next.js App Router
- TypeScript architecture
- Advanced Tailwind CSS
- Framer Motion
- Responsive design
- Reusable component systems
- React Portals
- Route Handlers
- Animation orchestration
- UI polish techniques
- Accessibility best practices

---

# 📄 License

This project was created solely for educational and evaluation purposes.

The original design inspiration belongs to **Accredian**. This repository is **not affiliated with or endorsed by Accredian**.

---

# 👨‍💻 Author

**Neil Borikar**

B.Tech – Artificial Intelligence & Data Science

- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-profile

---

## ⭐ Acknowledgements

- Accredian for the original design inspiration
- Next.js
- Tailwind CSS
- Framer Motion
- Lucide React
- Vercel

---

> **Note:** This project is intended solely as a frontend engineering assessment. It recreates portions of the Accredian Enterprise landing page while introducing an original visual identity and enhanced user experience.