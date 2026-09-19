// Product images.
// Products that have a real photo in /public/products use it. Every other
// product falls back to a clean branded image generated on the fly by
// /api/product-image (correct logo, colors and product name).
//
// To add a photo for another product: drop the file in /public/products and
// add a line to PRODUCT_PHOTOS below (key = exact product name from catalog.ts).

const PRODUCT_PHOTOS: Record<string, string> = {
  // Windows
  "Windows 11 Pro": "/products/windows-11-pro.jpg",
  "Windows 11 Pro - Online Key": "/products/windows-11-pro.jpg",
  "Windows 11 Pro - Phone Key": "/products/windows-11-pro.jpg",
  "Windows 11 Home": "/products/windows-11-home.jpg",
  "Windows 10 Pro": "/products/windows-10-pro.jpg",
  "Windows 10 Pro - Online Key": "/products/windows-10-pro.jpg",
  "Windows 10 Pro - Phone Key": "/products/windows-10-pro.jpg",
  "Windows 10 Home": "/products/windows-10-home.jpg",
  "Windows 8.1 Pro": "/products/windows-8-1-pro.jpg",
  "Windows 7 Professional": "/products/windows-7-professional.webp",
  "Windows 365 Business (1 Month)": "/products/windows-365-business.webp",

  // Office
  "Office 2021 Professional Plus": "/products/office-2021-professional-plus.png",
  "Office 2021 Pro Plus - Online Key": "/products/office-2021-pro-plus-key.jpg",
  "Office 2021 Pro Plus - Bind Key": "/products/office-2021-pro-plus-key.jpg",
  "Office 2021 Pro Plus - Phone Key": "/products/office-2021-pro-plus-key.jpg",
  "Office 2021 Home & Business": "/products/office-2021-home-and-business.jpg",
};

export function getProductImage(name: string): string {
  return PRODUCT_PHOTOS[name] ?? `/api/product-image?name=${encodeURIComponent(name)}`;
}
