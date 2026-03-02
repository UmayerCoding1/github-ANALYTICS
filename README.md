# Umayer GitHub Analytics Dashboard

A premium, production-ready GitHub Analytics Dashboard built with Next.js 14.

## Setup Instructions

1. **GitHub Access Token**: 
   - Go to GitHub Settings -> Developer settings -> Personal access tokens -> Tokens (classic).
   - Generate a new token with `repo`, `read:org`, and `user` scopes.

2. **Environment Variables**:
   - Create a `.env.local` file in the root directory.
   - Add your token and username:
     ```env
     GITHUB_ACCESS_TOKEN=your_token_here
     NEXT_PUBLIC_GITHUB_USERNAME=UmayerCoding1
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Design Style
- **Theme**: Stealth Black + Emerald Neon
- **UI**: Glassmorphism with Backdrop Blur
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization

## Deployment
This project is ready to be deployed on **Vercel**.
- Connect your GitHub repository to Vercel.
- Add `GITHUB_ACCESS_TOKEN` and `NEXT_PUBLIC_GITHUB_USERNAME` as Environment Variables in Vercel project settings.
