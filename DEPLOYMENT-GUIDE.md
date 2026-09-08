# Complete Deployment Guide
## From Development to Production

---

## 🎯 DEPLOYMENT OVERVIEW

This guide covers the complete deployment process to match IPTV Sverige's production standards.

**Timeline:**
- **Preparation:** 1-2 hours
- **DNS Configuration:** 24-48 hours (propagation)
- **Testing:** 2-4 hours
- **Total:** 2-3 days

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Code Quality
- [ ] All features tested locally
- [ ] No console errors
- [ ] No TypeScript errors: `npm run build`
- [ ] Linting passed: `npm run lint`
- [ ] Environment variables configured
- [ ] Git repository clean
- [ ] All changes committed

### Configuration Files
- [x] `next.config.ts` - Security headers added ✅
- [x] `vercel.json` - Vercel configuration added ✅
- [ ] `.env.local` - Environment variables set
- [x] `.gitignore` - Sensitive files excluded ✅
- [x] `package.json` - Dependencies up to date ✅

### Content Review
- [ ] All text proofread
- [ ] Images optimized
- [ ] Links verified
- [ ] Contact information correct
- [ ] Legal pages complete (Privacy, Terms, Refund)
- [ ] SEO metadata complete

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### STEP 1: Final Code Check

```bash
# Run lint
npm run lint

# Build project locally
npm run build

# Test production build
npm run start

# Visit http://localhost:3000 and test
```

**Verify:**
- ✅ Build completes without errors
- ✅ All pages load correctly
- ✅ No console errors
- ✅ Images display properly

---

### STEP 2: Environment Variables Setup

Create `.env.local` (copy from `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=https://officialkeyshub.com
NEXT_PUBLIC_SITE_NAME=Official Keys Hub
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_WHATSAPP_NUMBER=46XXXXXXXXX
```

**Important:** Never commit `.env.local` to Git!

---

### STEP 3: Push to GitHub

```bash
# Check status
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Add security headers and production optimizations"

# Push to main branch
git push origin main
```

---

### STEP 4: Vercel Deployment

#### Option A: Automatic (Recommended)

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Project:**
   - **Project Name:** officialkeyshub
   - **Framework:** Next.js (auto-detected)
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
   - **Install Command:** `npm install`

3. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add all variables from `.env.local`
   - Set for: Production, Preview, Development

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-5 minutes
   - Get temporary URL: `officialkeyshub.vercel.app`

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

### STEP 5: Custom Domain Configuration

#### 5.1 Add Domain in Vercel

1. **Go to Vercel Dashboard:**
   - Select your project
   - Go to Settings → Domains

2. **Add Domain:**
   - Enter: `officialkeyshub.com`
   - Click "Add"
   - Also add: `www.officialkeyshub.com`

3. **Get DNS Records:**
   Vercel will show required DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### 5.2 Configure DNS at Registrar

**For Namecheap:**
```
1. Login to Namecheap
2. Domain List → Manage
3. Advanced DNS
4. Add New Record:
   - Type: A Record
   - Host: @
   - Value: 76.76.21.21
   - TTL: Automatic

5. Add New Record:
   - Type: CNAME
   - Host: www
   - Value: cname.vercel-dns.com
   - TTL: Automatic
```

**For GoDaddy:**
```
1. Login to GoDaddy
2. My Products → DNS
3. Add A Record:
   - Name: @
   - Value: 76.76.21.21
   - TTL: 1 Hour

4. Add CNAME:
   - Name: www
   - Value: cname.vercel-dns.com
   - TTL: 1 Hour
```

**For Cloudflare:**
```
1. Login to Cloudflare
2. Select domain
3. DNS → Add record:
   - Type: A
   - Name: @
   - IPv4: 76.76.21.21
   - Proxy: ON (orange cloud)

4. Add record:
   - Type: CNAME
   - Name: www
   - Target: cname.vercel-dns.com
   - Proxy: ON (orange cloud)
```

#### 5.3 Wait for DNS Propagation

- **Time:** 5 minutes to 48 hours
- **Average:** 2-4 hours
- **Check:** [whatsmydns.net](https://whatsmydns.net)

---

### STEP 6: SSL Certificate (Automatic)

Vercel automatically provisions SSL certificates:

1. **Wait for DNS to propagate**
2. **Certificate issued automatically** (5-10 minutes)
3. **HTTPS enabled automatically**
4. **Auto-renewal every 90 days**

**Verify HTTPS:**
- Visit: `https://officialkeyshub.com`
- Look for padlock icon 🔒
- Test: [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/)

---

### STEP 7: Configure Redirects

#### 7.1 Set Primary Domain

In Vercel → Settings → Domains:
1. Find `officialkeyshub.com`
2. Click "Set as Primary"
3. `www.officialkeyshub.com` will auto-redirect

#### 7.2 Force HTTPS (Already Configured)

Your `next.config.ts` includes HSTS header:
```typescript
'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
```

All HTTP traffic automatically redirects to HTTPS.

---

### STEP 8: Cloudflare Setup (Optional)

#### Benefits:
- ✅ DDoS protection
- ✅ Global CDN
- ✅ Faster loading
- ✅ Additional security
- ✅ Free tier

#### Setup Process:

1. **Sign up at Cloudflare:**
   - [cloudflare.com/sign-up](https://www.cloudflare.com/sign-up)
   - Add site: `officialkeyshub.com`
   - Select Free plan

2. **Update Nameservers:**
   ```
   At your domain registrar, change nameservers to:
   
   name1.cloudflare.com
   name2.cloudflare.com
   
   (Cloudflare provides exact nameservers)
   ```

3. **Configure Cloudflare DNS:**
   ```
   Type: A
   Name: @
   Content: 76.76.21.21
   Proxy: ON (orange cloud)

   Type: CNAME
   Name: www
   Content: cname.vercel-dns.com
   Proxy: ON (orange cloud)
   ```

4. **SSL/TLS Settings:**
   - Go to SSL/TLS → Overview
   - Select: **Full (strict)**

5. **Speed Optimization:**
   - Speed → Optimization
   - Enable: Auto Minify (JS, CSS, HTML)
   - Enable: Brotli
   - Enable: Early Hints

6. **Security Settings:**
   - Security → Settings
   - Security Level: Medium
   - Challenge Passage: 30 minutes
   - Browser Integrity Check: ON

7. **Caching:**
   - Caching → Configuration
   - Caching Level: Standard
   - Browser Cache TTL: Respect Existing Headers

8. **Page Rules (Free: 3 rules):**
   
   **Rule 1 - Always Use HTTPS:**
   ```
   URL: http://*officialkeyshub.com/*
   Setting: Always Use HTTPS
   ```

   **Rule 2 - Cache Everything:**
   ```
   URL: officialkeyshub.com/*
   Settings:
   - Cache Level: Cache Everything
   - Edge Cache TTL: a month
   ```

   **Rule 3 - Security for Admin:**
   ```
   URL: officialkeyshub.com/admin*
   Setting: Security Level: High
   ```

---

### STEP 9: Monitoring & Analytics

#### 9.1 Google Search Console

1. **Add Property:**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add property: `officialkeyshub.com`
   
2. **Verify Ownership:**
   
   **Method 1 - DNS Verification:**
   ```
   Add TXT record at your DNS provider:
   Name: @
   Value: google-site-verification=xxxxx
   ```

   **Method 2 - HTML File:**
   ```
   Download verification file
   Place in /public folder
   Deploy
   ```

3. **Submit Sitemap:**
   ```
   Sitemaps → Add new sitemap
   URL: https://officialkeyshub.com/sitemap.xml
   Submit
   ```

#### 9.2 Google Analytics

Already configured in your site. Verify:
1. Go to [analytics.google.com](https://analytics.google.com)
2. Check Real-time reports
3. Visit your site
4. Confirm traffic appears

#### 9.3 Vercel Analytics

Enable in Vercel:
1. Go to project → Analytics
2. Click "Enable Analytics"
3. Free tier: 1000 events/month
4. View real-time performance data

#### 9.4 Uptime Monitoring

**Set up UptimeRobot:**
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add New Monitor:
   - Type: HTTP(s)
   - URL: `https://officialkeyshub.com`
   - Monitoring Interval: 5 minutes
   - Alert via: Email

---

### STEP 10: Post-Deployment Testing

#### 10.1 Immediate Checks (5 minutes)

- [ ] Site loads: `https://officialkeyshub.com`
- [ ] HTTPS working (padlock visible)
- [ ] WWW redirect working
- [ ] All pages load
- [ ] Images display
- [ ] Forms work
- [ ] Links work
- [ ] Mobile responsive

#### 10.2 Security Testing (15 minutes)

**Test Security Headers:**
```
Visit: https://securityheaders.com
Enter: officialkeyshub.com
Target: Grade A
```

**Expected Headers:**
- ✅ Strict-Transport-Security
- ✅ Content-Security-Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy

**Test SSL:**
```
Visit: https://www.ssllabs.com/ssltest/
Enter: officialkeyshub.com
Target: Grade A+
```

#### 10.3 Performance Testing (20 minutes)

**PageSpeed Insights:**
```
Visit: https://pagespeed.web.dev/
Enter: officialkeyshub.com

Targets:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+
```

**GTmetrix:**
```
Visit: https://gtmetrix.com
Enter: officialkeyshub.com

Targets:
- Performance: Grade A
- Structure: Grade A
- Load Time: < 3s
```

#### 10.4 SEO Testing (15 minutes)

- [ ] Google Search Console connected
- [ ] Sitemap submitted
- [ ] robots.txt accessible
- [ ] Meta tags present
- [ ] Structured data valid
- [ ] Mobile-friendly test passed

#### 10.5 Cross-Browser Testing (30 minutes)

Test on:
- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Mobile Safari (iOS)
- [ ] Chrome (Android)

---

## 🔄 CONTINUOUS DEPLOYMENT

### Automatic Deployments

Vercel automatically deploys on:
- ✅ Push to `main` branch → Production
- ✅ Push to other branches → Preview
- ✅ Pull requests → Preview

### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

### Rollback

If issues arise:
1. Go to Vercel → Deployments
2. Find previous working deployment
3. Click "⋯" → "Promote to Production"

---

## 🛠️ MAINTENANCE

### Daily
- [ ] Check uptime monitoring
- [ ] Monitor error logs
- [ ] Review analytics

### Weekly
- [ ] Check Search Console
- [ ] Review performance metrics
- [ ] Check for 404 errors
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content updates
- [ ] SEO review
- [ ] Backup check

### Quarterly
- [ ] Comprehensive security audit
- [ ] Full functionality testing
- [ ] A/B testing analysis
- [ ] Conversion optimization
- [ ] Content strategy review

---

## 🚨 TROUBLESHOOTING

### Common Issues

#### Domain Not Resolving
```
Problem: Site doesn't load at custom domain
Solution:
1. Check DNS records are correct
2. Wait 24-48 hours for propagation
3. Clear DNS cache: ipconfig /flushdns
4. Check whatsmydns.net
```

#### SSL Certificate Not Issued
```
Problem: HTTPS not working
Solution:
1. Verify DNS points to Vercel
2. Wait 10-15 minutes
3. Check Vercel deployment logs
4. Contact Vercel support
```

#### Security Headers Not Showing
```
Problem: securityheaders.com shows low grade
Solution:
1. Verify next.config.ts is correct
2. Rebuild and redeploy
3. Clear CDN cache (if using Cloudflare)
4. Wait 5 minutes and test again
```

#### Slow Loading
```
Problem: PageSpeed score < 90
Solution:
1. Enable Cloudflare CDN
2. Optimize images (WebP format)
3. Check Core Web Vitals
4. Enable caching
5. Minify CSS/JS
```

#### Forms Not Working
```
Problem: Contact form doesn't submit
Solution:
1. Check browser console for errors
2. Verify API routes deployed
3. Check CORS settings
4. Test in different browsers
```

---

## 📞 SUPPORT CONTACTS

### Vercel
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Support: [vercel.com/support](https://vercel.com/support)
- Status: [vercel-status.com](https://www.vercel-status.com)

### Cloudflare
- Documentation: [developers.cloudflare.com](https://developers.cloudflare.com)
- Community: [community.cloudflare.com](https://community.cloudflare.com)
- Support: Dashboard → Support

### DNS/Domain
- Namecheap Support: [support.namecheap.com](https://support.namecheap.com)
- GoDaddy Support: [support.godaddy.com](https://support.godaddy.com)

---

## ✅ DEPLOYMENT COMPLETE!

Congratulations! Your site is now:

- 🔒 **Secure:** HTTPS + Security Headers + HSTS
- ⚡ **Fast:** Optimized + CDN + Caching
- 📊 **Monitored:** Analytics + Search Console + Uptime
- 🌐 **Live:** Custom Domain + Professional Setup
- 🛡️ **Protected:** DDoS Protection + Firewall

**Next Steps:**
1. ✅ Monitor performance daily
2. ✅ Update content regularly
3. ✅ Respond to user feedback
4. ✅ Optimize based on analytics
5. ✅ Keep dependencies updated

---

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Production URL:** https://officialkeyshub.com  
**Status:** ✅ Live

---

*Last Updated: July 25, 2026*
