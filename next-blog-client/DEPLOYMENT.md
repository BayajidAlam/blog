# Deployment Guide - Vercel

## Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free at https://vercel.com)
- Backend API deployed and accessible

## Environment Variables Required

Before deploying, you need to set these environment variables in Vercel:

- `BACKEND_URL` - Your backend API URL (e.g., https://api.example.com)
- `FRONTEND_URL` - Your Vercel app URL (e.g., https://your-app.vercel.app)
- `API_URL` - Your API endpoint URL
- `AUTH_URL` - Your authentication URL (usually same as FRONTEND_URL)
- `NEXT_PUBLIC_TEST` - Public test variable

## Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com/new
   - Sign in and click "Add New Project"
   - Import your repository
   - Configure environment variables in the dashboard
   - Click "Deploy"

3. **Update Environment Variables**:
   - After first deployment, copy your Vercel URL
   - Update `FRONTEND_URL` and `AUTH_URL` with your actual Vercel URL
   - Redeploy if necessary

## Method 2: Deploy via CLI

1. **Login to Vercel**:
   ```bash
   pnpm vercel login
   ```

2. **Deploy to Preview** (test first):
   ```bash
   pnpm vercel
   ```

3. **Deploy to Production**:
   ```bash
   pnpm vercel --prod
   ```

4. **Add Environment Variables via CLI**:
   ```bash
   pnpm vercel env add BACKEND_URL
   pnpm vercel env add FRONTEND_URL
   pnpm vercel env add API_URL
   pnpm vercel env add AUTH_URL
   pnpm vercel env add NEXT_PUBLIC_TEST
   ```

## Post-Deployment

1. **Verify the deployment** at your Vercel URL
2. **Update backend CORS settings** to allow your Vercel domain
3. **Configure custom domain** (optional) in Vercel dashboard
4. **Enable automatic deployments** for your main branch

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to your main/master branch
- **Preview**: Pull requests and other branches

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Environment Variables Not Working
- Make sure variables starting with `NEXT_PUBLIC_` are added
- Redeploy after adding/changing variables
- Check variable names match exactly in your code

### API Connection Issues
- Verify BACKEND_URL is accessible from Vercel servers
- Check CORS settings on your backend
- Ensure API URLs use HTTPS in production

## Additional Scripts

Add these to your package.json if needed:

```json
{
  "scripts": {
    "deploy": "vercel --prod",
    "deploy:preview": "vercel"
  }
}
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
