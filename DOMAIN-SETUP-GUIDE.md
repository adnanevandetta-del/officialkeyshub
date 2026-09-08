# Domain Setup & Configuration Guide
## Complete Step-by-Step Instructions

---

## 📋 PREREQUISITES

Before starting, ensure you have:
- [ ] Domain name purchased (e.g., officialkeyshub.com)
- [ ] Vercel account created
- [ ] Access to domain registrar dashboard
- [ ] GitHub repository connected to Vercel

---

## 🚀 STEP 1: VERCEL DEPLOYMENT

### 1.1 Initial Deployment

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add security headers and optimization"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Wait for deployment to complete**
   - You'll get a temporary URL: `your-project.vercel.app`

---

## 🌐 STEP 2: CUSTOM DOMAIN SETUP

### 2.1 Add Domain in Vercel

1. **Navigate to your project in Vercel**
2. **Go to Settings → Domains**
3. **Add your domain:**
   - Enter: `officialkeyshub.com`
   - Enter: `www.officialkeyshub.com`
4. **Vercel will provide DNS records**

### 2.2 DNS Configuration Options

**Option A: Use Vercel Nameservers (RECOMMENDED)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Use Custom DNS Records**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## 🔧 STEP 3: DNS CONFIGURATION

### 3.1 At Your Domain Registrar

**If using Namecheap:**
1. Log in to Namecheap
2. Go to Domain List → Manage
3. Choose "Custom DNS"
4. Enter Vercel nameservers OR
5. Use Advanced DNS for custom records

**If using GoDaddy:**
1. Log in to GoDaddy
2. Go to My Products → DNS
3. Add/Edit DNS records as provided by Vercel

**If using Cloudflare:**
1. Log in to Cloudflare
2. Add site → Enter your domain
3. Update nameservers at your registrar
4. Add DNS records in Cloudflare dashboard

### 3.2 Required DNS Records

```
# Main Domain
Type: A
Name: @
Value: 76.76.21.21
TTL: Automatic

# WWW Subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Automatic

# Email (if needed)
Type: MX
Name: @
Priority: 10
Value: your-mail-server.com
```

---

## 🔒 STEP 4: SSL/HTTPS CONFIGURATION

### 4.1 Automatic SSL (Vercel)

Vercel automatically provisions SSL certificates via Let's Encrypt:
- ✅ Happens automatically within minutes
- ✅ Auto-renewal every 90 days
- ✅ No manual configuration needed

### 4.2 Verify HTTPS

1. Wait 5-10 minutes after DNS configuration
2. Visit your domain: `https://officialkeyshub.com`
3. Check for padlock icon in browser
4. Test both www and non-www versions

### 4.3 Force HTTPS Redirect

Already configured in `next.config.ts`:
- All HTTP traffic redirects to HTTPS
- HSTS header enforces HTTPS

---

## 🎯 STEP 5: WWW vs NON-WWW REDIRECT

### Choose Your Preference:

**Option A: Non-WWW (Recommended)**
- Primary: `officialkeyshub.com`
- Redirect: `www.officialkeyshub.com` → `officialkeyshub.com`

**Option B: WWW**
- Primary: `www.officialkeyshub.com`
- Redirect: `officialkeyshub.com` → `www.officialkeyshub.com`

### Configure in Vercel:
1. Go to Settings → Domains
2. Set one domain as "Primary"
3. Others will automatically redirect

---

## ✅ STEP 6: VERIFICATION & TESTING

### 6.1 DNS Propagation Check

Use online tools:
- [whatsmydns.net](https://www.whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

Enter your domain and check:
- ✅ A record points to Vercel IP
- ✅ CNAME record for www subdomain

### 6.2 SSL Certificate Check

Use SSL testing tools:
- [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/)
- Target: A+ rating

### 6.3 Security Headers Check

Use header testing tools:
- [securityheaders.com](https://securityheaders.com)
- Target: A rating

Test your domain and verify:
- ✅ Strict-Transport-Security present
- ✅ X-Frame-Options present
- ✅ X-Content-Type-Options present
- ✅ Content-Security-Policy present

### 6.4 Performance Check

Test with:
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Target scores:
- 🎯 Performance: 90+
- 🎯 Accessibility: 90+
- 🎯 Best Practices: 90+
- 🎯 SEO: 90+

---

## 🔥 STEP 7: CLOUDFLARE SETUP (OPTIONAL BUT RECOMMENDED)

### 7.1 Why Cloudflare?

Benefits:
- ✅ DDoS protection
- ✅ CDN (faster loading worldwide)
- ✅ Additional security features
- ✅ Free tier available
- ✅ Better uptime

### 7.2 Cloudflare Setup

1. **Sign up at [cloudflare.com](https://cloudflare.com)**

2. **Add your site:**
   - Enter: `officialkeyshub.com`
   - Choose free plan

3. **Update nameservers at registrar:**
   ```
   Cloudflare provides:
   name1.cloudflare.com
   name2.cloudflare.com
   ```

4. **Configure DNS in Cloudflare:**
   - Import existing records
   - Add Vercel records

5. **Enable security features:**
   - SSL/TLS → Full (strict)
   - Firewall → Configure rules
   - Speed → Auto Minify (JS, CSS, HTML)
   - Caching → Standard

6. **Page Rules (Free tier: 3 rules):**
   ```
   Rule 1: Always Use HTTPS
   URL: http://*officialkeyshub.com/*
   Setting: Always Use HTTPS

   Rule 2: Cache Everything
   URL: *officialkeyshub.com/*
   Settings: Cache Level: Cache Everything

   Rule 3: Security Level
   URL: *officialkeyshub.com/admin*
   Setting: Security Level: High
   ```

---

## 📊 STEP 8: MONITORING & ANALYTICS

### 8.1 Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `officialkeyshub.com`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://officialkeyshub.com/sitemap.xml`

### 8.2 Google Analytics 4

Already implemented in your site:
- ✅ Google Analytics component added
- ✅ Google Tag Manager configured

Verify tracking:
1. Visit Google Analytics dashboard
2. Check Real-time reports
3. Visit your site in incognito
4. Confirm tracking works

### 8.3 Uptime Monitoring

Free options:
- [UptimeRobot](https://uptimerobot.com) - Free 50 monitors
- [StatusCake](https://www.statuscake.com) - Free tier available
- [Pingdom](https://www.pingdom.com) - 14-day trial

Configure:
- Monitor: `https://officialkeyshub.com`
- Check interval: 5 minutes
- Alert email: your-email@domain.com

---

## 🛡️ STEP 9: SECURITY HARDENING

### 9.1 Security Headers (Already Implemented)

Verify on [securityheaders.com](https://securityheaders.com):
- ✅ Strict-Transport-Security
- ✅ Content-Security-Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### 9.2 Additional Security Measures

1. **Enable Vercel Password Protection** (optional):
   - Settings → Password Protection
   - Useful for staging environment

2. **Configure Firewall Rules** (if using Cloudflare):
   - Block known bad bots
   - Rate limiting
   - Country blocking (if needed)

3. **Set up Vercel Web Analytics:**
   - Free privacy-friendly analytics
   - No cookies required
   - GDPR compliant

---

## 📝 STEP 10: POST-DEPLOYMENT CHECKLIST

### Final Verification:

- [ ] Domain resolves correctly
- [ ] HTTPS works (padlock icon visible)
- [ ] WWW redirect works
- [ ] All pages load correctly
- [ ] Images load properly
- [ ] Links work (internal & external)
- [ ] Contact forms work
- [ ] Payment integration works
- [ ] Mobile responsive
- [ ] Fast loading (< 3 seconds)
- [ ] Security headers present
- [ ] Google Analytics tracking
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] Favicon displays
- [ ] No console errors
- [ ] WhatsApp button works

---

## 🚨 TROUBLESHOOTING

### Common Issues:

**1. Domain not resolving:**
- Wait 24-48 hours for DNS propagation
- Clear DNS cache: `ipconfig /flushdns` (Windows)
- Check DNS records are correct

**2. SSL certificate not issued:**
- Verify DNS records point to Vercel
- Wait 10-15 minutes
- Check Vercel deployment logs

**3. Redirect loop:**
- Check Vercel domain settings
- Verify only one domain is set as primary
- Clear browser cache

**4. 404 errors:**
- Verify deployment successful
- Check file paths are correct
- Rebuild and redeploy

**5. Slow loading:**
- Enable Cloudflare CDN
- Optimize images
- Check Core Web Vitals
- Enable caching

---

## 📞 SUPPORT RESOURCES

### Vercel Support:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### DNS Help:
- [DNS Propagation Checker](https://www.whatsmydns.net)
- [Cloudflare Community](https://community.cloudflare.com)

### Security:
- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [Mozilla Observatory](https://observatory.mozilla.org)

---

## ✅ COMPLETION CHECKLIST

Mark completed items:

**Domain Configuration:**
- [ ] Domain purchased
- [ ] DNS records configured
- [ ] Domain added to Vercel
- [ ] DNS propagated (24-48 hours)

**HTTPS & Security:**
- [ ] SSL certificate issued
- [ ] HTTPS working
- [ ] Security headers verified
- [ ] HSTS enabled

**Performance:**
- [ ] PageSpeed score > 90
- [ ] Images optimized
- [ ] CDN configured (optional)
- [ ] Caching enabled

**Monitoring:**
- [ ] Google Analytics working
- [ ] Search Console configured
- [ ] Uptime monitoring setup
- [ ] Error tracking enabled

**Final Testing:**
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] All forms work
- [ ] Payment integration tested
- [ ] No console errors

---

## 🎉 SUCCESS!

Your website is now:
✅ Secure (HTTPS + Security Headers)
✅ Fast (Optimized & CDN)
✅ Monitored (Analytics & Uptime)
✅ Professional (Custom Domain)
✅ Protected (DDoS & Firewall)

**Next Steps:**
1. Submit sitemap to search engines
2. Start content marketing
3. Monitor analytics
4. Regular security audits
5. Keep dependencies updated

---

*Last Updated: July 25, 2026*
*Need help? Check Vercel documentation or Cloudflare support*
