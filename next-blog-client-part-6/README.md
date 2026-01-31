# Next.js Blog Application

## ✅ CONFIGURED: Local Development Setup

**Status**: Environment configured for local development

### What Was Changed

1. **Backend server started**:
   - Running on `http://localhost:5000`
   - Command: `pnpm dev` in `/prisma-blog-server`

2. **Environment variables updated** in `.env`:
   - `BACKEND_URL`: `https://prisma-blog-server-navy.vercel.app` → `http://localhost:5000`
   - `API_URL`: `https://prisma-blog-server-navy.vercel.app/api` → `http://localhost:5000/api`
   - `AUTH_URL`: `https://prisma-blog-server-navy.vercel.app` → `http://localhost:5000`
   - `NEXT_PUBLIC_BACKEND_URL`: `https://prisma-blog-server-navy.vercel.app` → `http://localhost:5000`

3. **Next action**: Restart frontend dev server to apply changes

### Running the Application

**Both servers must be running**:

```bash
# Terminal 1 - Backend
cd /home/bayajidswe/My-files/blog/prisma-blog-server
pnpm dev  # Runs on http://localhost:5000

# Terminal 2 - Frontend
cd /home/bayajidswe/My-files/blog/next-blog-client-part-6
pnpm dev  # Runs on http://localhost:3000
```

### Switching to Production

To use production backend, update `.env`:

```env
BACKEND_URL=https://prisma-blog-server-navy.vercel.app
API_URL=https://prisma-blog-server-navy.vercel.app/api
AUTH_URL=https://prisma-blog-server-navy.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://prisma-blog-server-navy.vercel.app
```

**Note**: Production backend only trusts `*.vercel.app` domains, so deploy to Vercel to test with production URLs.

---

## Authentication & Cookie Fix - Changes Documentation

### Problems Solved

- `ERR_CONNECTION_REFUSED` - Auth client couldn't connect to backend
- `403 Forbidden` - Backend not trusting frontend origin
- CORS blocking cross-domain cookie setting
- Login not redirecting or updating navbar
- Dashboard inaccessible

### Root Cause

Cross-domain cookie restrictions prevented cookies set on one domain from being sent to another.

---

## Essential Changes Applied

### 1. `next.config.ts` - Auth Proxy

```typescript
async rewrites() {
  return [{
    source: "/api/auth/:path*",
    destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
  }];
}
```

**Purpose**: Proxy auth requests to backend so cookies are set on same domain

### 2. `src/lib/auth-client.ts` - Same Domain Base URL

```typescript
baseURL: typeof window !== "undefined" ? window.location.origin : "",
fetchOptions: { credentials: "include" }
```

**Purpose**: Auth requests use same domain, get rewritten to backend

### 3. `src/middleware.ts` - Dashboard Protection

```typescript
export const config = {
  matcher: ["/dashboard/:path*", "/admin-dashboard/:path*"],
};
```

**Purpose**: Checks `better-auth.session_token` cookie before allowing dashboard access

### 4. `src/components/modules/authentication/login-form.tsx` - Hard Redirect

```typescript
window.location.href = "/dashboard";
```

**Purpose**: Forces page reload after login to ensure cookies are read

### 5. `src/components/layout/Navbar.tsx` - Auth State Detection

- `useEffect` to check session on mount/focus
- Conditional rendering: Dashboard/Logout vs Login/Register

**Purpose**: Dynamic navbar based on authentication status

### 6. `src/components/layout/dashboard-layout.tsx` - Client Component

- Client-side session fetching with `authClient.getSession()`
- Loading state and redirect handling

**Purpose**: Client-side fetching uses rewrites, cookies work properly

---

## How The Proxy Pattern Works

### Why Requests Go to `localhost:3000`

**This is intentional and correct!** Browsers block cross-domain cookies by default. To work around this:

1. **Frontend** makes request to same domain: `localhost:3000/api/auth/sign-in/email`
2. **Next.js rewrite** forwards it to backend: `http://localhost:5000/api/auth/sign-in/email`
3. **Backend** responds with cookie set on the frontend's domain
4. **Browser** accepts the cookie because it's from `localhost:3000` (same domain)

### Request Flow

**Login Flow**:

- Form submits to `localhost:3000/api/auth/sign-in/email`
- Next.js rewrites to `NEXT_PUBLIC_BACKEND_URL/api/auth/sign-in/email`
- Cookie set on client domain
- Hard redirect to dashboard

**Dashboard Access**:

- Middleware checks `better-auth.session_token` cookie
- Client fetches session via rewrite proxy
- User data loads

**Navbar**:

- Checks session on mount/focus/visibility
- Updates UI dynamically (Dashboard/Logout vs Login/Register)

---

## Environment Variables

### For Local Development

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

**Important**: Backend must be running locally on port 5000

### For Production

```env
NEXT_PUBLIC_BACKEND_URL=https://prisma-blog-server-navy.vercel.app
```

**Current Production URLs**:

- Frontend: https://next-blog-client-zeta.vercel.app
- Backend: https://prisma-blog-server-navy.vercel.app

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
