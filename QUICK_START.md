# 🚀 Quick Start - Deploy in 5 Minutes

## Fastest Deployment Options

### Option 1: Netlify (Recommended - 2 minutes)

1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop your entire project folder
4. **Done!** Your site is live with HTTPS

**That's it!** Netlify automatically:
- ✅ Provides HTTPS
- ✅ Configures CDN
- ✅ Sets up all headers
- ✅ Enables service worker

---

### Option 2: Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click "Add New Project"
3. Drag and drop your project folder
4. **Done!** Your site is live

---

### Option 3: GitHub Pages (5 minutes)

1. Create a GitHub account (if you don't have one)
2. Create a new repository
3. Upload all files to the repository
4. Go to Settings → Pages
5. Select branch (usually `main`)
6. **Done!** Site live at `username.github.io/repo-name`

---

## Pre-Deployment Checklist

Before deploying, make sure to:

- [ ] Update domain URLs in `index.html` (replace `lightofguidance.com` with your domain)
- [ ] Update domain in `sitemap.xml`
- [ ] Update domain in `robots.txt`
- [ ] Update social media links (replace `#` with actual URLs)

---

## Post-Deployment

1. Visit your live site
2. Open browser DevTools (F12)
3. Check Console for any errors
4. Visit `/health-check.html` to verify everything works
5. Run Lighthouse audit (Chrome DevTools → Lighthouse)

---

## Need Help?

See `DEPLOYMENT.md` for detailed instructions for all platforms.

---

**Status:** ✅ Ready to deploy right now!

