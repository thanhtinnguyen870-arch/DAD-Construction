# Deploy Checklist

## Frontend

- Hosting: Vercel or Netlify.
- Root/build directory: `frontend`.
- Build command: `npm run build`.
- Publish directory: `dist`.
- Environment variable: `VITE_API_URL=https://your-backend-domain.com/api`.

The project includes SPA rewrites for Vercel (`frontend/vercel.json`) and Netlify (`frontend/public/_redirects`) so direct links such as `/du-an` and `/admin/login` work after refresh.

## Backend

- Hosting: Render, Railway, Fly.io, or another Node host.
- Root directory: `backend`.
- Start command: `npm start`.
- Required environment variables are listed in `backend/.env.example`.
- Health check path: `/api/health`.

## Before Sharing Publicly

- Set a strong `JWT_SECRET`.
- Do not use the default seeded admin password in production.
- Set `CORS_ORIGIN` to the deployed frontend domain.
- Seed sample content only after checking that the Vietnamese text and images look correct.
