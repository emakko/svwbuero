A high-performance, responsive web application for a certified Automotive Expert (Kfz-Sachverständiger). Built with React 18, TypeScript, and Vite for a modern, lightning-fast user experience.

🛠 Tech Stack & Dependencies
Core Framework
React 18: Utilizes the latest concurrent rendering features for a smooth UI.

TypeScript: Ensures type safety across the application, especially for certificate data and contact form handling.

Vite: Used as the build tool and development server for near-instant Hot Module Replacement (HMR).

Frontend Libraries
Lucide React: A beautiful, consistent icon library. We use this for professional indicators (e.g., Award, ShieldCheck, FileCheck) in the certification section.

React Router (v6): Handles client-side routing for the main page, legal notices (Impressum), and privacy policy (Datenschutz).

React PDF: (Added via previous discussion) Powers the integrated certificate viewer, allowing users to view multi-page credentials without leaving the site.

Security & Forms
React Google reCAPTCHA: Protects the contact form from spam, ensuring that lead generation remains high-quality and bot-free.

🚀 Getting Started
Prerequisites
Node.js (v18.0 or higher recommended)

npm or yarn

Installation
Clone the repository:

Bash
git clone [your-repo-url]
Install dependencies:

Bash
npm install
Development
Start the local development server:

Bash
npm run dev
The application will be available at http://localhost:5173.

Production Build
Generate a highly optimized production build in the dist/ folder:

Bash
npm run build