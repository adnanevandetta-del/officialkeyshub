# Sitemap Fix Guide

## Issue
Google Search Console shows: "Sitemap is HTML" error

## What We Did

### 1. Verified Sitemap Configuration ✅
- `app/sitemap.ts` is correctly configured for Next.js 15
- Sitemap includes all important pages with proper priorities
- Build confirms sitemap.xml is generated (127 B)

### 2. Triggered Fresh Deployment ✅
- Pushed new deployment to clear any Vercel caching
- Sitemap will be regenerated on next build

## Next Steps for You

### Step 1: Wait for Vercel Deployment (5-10 minutes)
The new deployment will regenerate the sitemap with fresh content.

### Step 2: Verify Sitemap is Working
Test your sitemap by visiting:
```
https://iptvv.se/sitemap.xml
```

You should see XML content like:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://iptvv.se</loc>
    <lastmod>2026-06-17</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ...
</urlset>
```

### Step 3: Re-Submit to Google Search Console

1. **Go to Google Search Console**
   - https://search.google.com/search-console

2. **Navigate to Sitemaps**
   - Left sidebar → Sitemaps

3. **Remove Old Sitemap (if exists)**
   - Click the three dots next to the sitemap
   - Select "Remove sitemap"

4. **Add Fresh Sitemap**
   - Enter: `sitemap.xml`
   - Click "Submit"

5. **Request Re-indexing**
   - Google Search Console → URL Inspection
   - Enter: `https://iptvv.se/sitemap.xml`
   - Click "Request Indexing"

### Step 4: Clear Cache (Optional)
If the issue persists after 24 hours:

**Clear Cloudflare/CDN Cache** (if using):
- Login to Vercel Dashboard
- Go to your project
- Deployments → Latest → "Redeploy"

**Test with different tools**:
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://www.google.com/ping?sitemap=https://iptvv.se/sitemap.xml

## Sitemap Pages Included

✅ Homepage (Priority: 1.0)
✅ FAQ (Priority: 0.9)
✅ Setup Guide (Priority: 0.9)
✅ Blog (Priority: 0.9)
✅ Blog Posts:
   - How Much Data Does IPTV Use (0.8)
   - Why Is My IPTV Buffering (0.8)
   - Cheaper Than Sky TV NZ (0.8)
✅ Legal Pages:
   - Terms (0.5)
   - Privacy (0.5)
   - Refund Policy (0.5)

## Why This Happened

Common causes:
1. **Vercel caching**: Old deployment served cached HTML
2. **First deployment**: Sitemap not generated on initial deploy
3. **Google cache**: Search Console cached old response

## Expected Timeline

- **Immediate**: Fresh deployment triggered
- **5-10 minutes**: New sitemap.xml available
- **24-48 hours**: Google Search Console updates
- **1-2 weeks**: Full re-indexing of all pages

## Support

If the issue persists after 48 hours:
1. Check https://iptvv.se/sitemap.xml returns valid XML
2. Verify all URLs in sitemap are accessible
3. Check Google Search Console Coverage report for errors

---

**Last Updated**: June 17, 2026
**Deployment**: Triggered (commit e742675)
**Status**: Awaiting Google Search Console refresh ⏳
