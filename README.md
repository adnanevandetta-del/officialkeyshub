# StreamPro IPTV - Next.js Website

A modern, responsive IPTV subscription website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ⚡ Built with Next.js 15 App Router
- 🎨 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 🎭 Modern UI with gradient effects
- 💳 Payment modal with PayPal & Stripe integration placeholders
- 📧 Contact form
- ❓ FAQ accordion
- ⭐ Customer testimonials
- 🎬 Channel categories showcase
- 💰 Pricing plans with feature comparison

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
iptv-website/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Trusted.tsx
│   │   ├── Features.tsx
│   │   ├── Channels.tsx
│   │   ├── Pricing.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── backup/              # Original HTML/CSS/JS files
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors

Edit the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#6c63ff",
  "primary-dark": "#5a52e0",
  secondary: "#ff6b6b",
  accent: "#00d4ff",
  // ...
}
```

### Payment Integration

To integrate real payment processing:

1. **PayPal**: Update the PayPal email in `PaymentModal.tsx`
2. **Stripe**: Implement Stripe.js in `PaymentModal.tsx` following [Stripe's documentation](https://stripe.com/docs/js)

### Content

Update content in the respective component files:
- Pricing plans: `app/components/Pricing.tsx`
- Features: `app/components/Features.tsx`
- Channels: `app/components/Channels.tsx`
- Testimonials: `app/components/Testimonials.tsx`
- FAQ: `app/components/FAQ.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

Build the project:

```bash
npm run build
```

Then deploy the `.next` folder and `public` directory to your hosting provider.

## Technologies Used

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)

## License

This project is for demonstration purposes. Customize as needed for your use case.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.
