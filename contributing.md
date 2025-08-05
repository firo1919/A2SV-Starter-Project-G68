# 🌟 Contributing to the A2SV Application Platform – Starter Project

Welcome! 🎉 We’re building the A2SV Application Platform MVP together.  
This document explains how to contribute effectively so our codebase stays clean, consistent, and professional.

---

## 📂 Project Folder Structure

Follow this structure when adding files:

### Folder structure
-   public/
    -   images/
-   src/
    -   app/
        -   (routes)
        -   components/
	- ui/
    -   hooks/
    -   lib/
        -   redux/
            -   api/
            -   clientApi.ts
            -   slices/
            -   [sliceName].ts
            -   types/
            -   [typeName].ts
            -   utils/
            -   [utilityFunction].ts
    -   providers/
        -   ReduxProvider.tsx
        -   ThemeProvider.tsx
    -   styles/
        -   globals.css
        -   theme.css
    -   types/
        -   [globalTypeName].ts
    -   utils/
        -   [utilityFunction].ts
    -   tests/
        -   [FeatureOrComponentName]/
            -   [componentOrPage].test.tsx

### Routing structure
-   /admin
-   /manager
-   /reviewer
-   /applicant
-   (public)
    -   /
    -   /login
    -   /register-user
    -   /reset-password
    -   /forgot-password

### Dependencies
@hookform/resolvers
@reduxjs/toolkit
@tailwindcss/postcss
@testing-library/dom
@testing-library/jest-dom
@testing-library/react
cypress
eslint-plugin-jest-dom
eslint-plugin-testing-library
jest-environment-jsdom
jest
next-auth@beta
react-hook-form
react-redux
tailwindcss
zod@4.0.14


---

## 🚀 Development Workflow

1. **Branching**
   - Use feature branches:  
     `feature/<feature-name>` for features  
     `fix/<bug-name>` for bug fixes
   - Keep `main` branch stable and deployment-ready

2. **Commits**
   - Use clear, descriptive messages:
     ```
     feat: implement applicant dashboard
     fix: correct API endpoint for login
     ```
   - Commit frequently, but only working code

3. **Pull Requests**
   - Open PRs from your branch into `main`
   - Keep them focused on a single feature/fix
   - Link related issues and user stories
   - At least one teammate must review before merging

---

## 🎨 Design & Styling

- **Frameworks:** Next.js + React + TypeScript
- **Styling:** Tailwind CSS only
- **Mobile-first:** Start from small screens → tablet → desktop
- **Figma:** Follow [Figma design](https://www.figma.com/design/7bYFK1UxLDudzX78P414g5/G6-Web-Team---a2SV-application-Platform?node-id=0-1&p=f&t=AUw1sxdSdng0wz6U-0)
- Small UI enhancements are okay if they improve usability

---

## 📡 API Integration

- Use your team’s backend URL:
https://a2sv-application-platform-backend-team[TEAM_NO].onrender.com

- Check `/docs` for API endpoints
- Test all endpoints with Postman or Swagger before integration

---

## ✅ Testing

- Tests live in `src/tests/[FeatureOrComponentName]/`
- Use **Jest** + **React Testing Library**
- Ensure all tests pass before merging:
```bash
npm run test

---
