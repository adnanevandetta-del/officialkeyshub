// Every product gets a branded retail-box image generated on the fly by
// /api/product-image (Official Keys Hub logo, colors and product name).
// This keeps imagery accurate to each product and copyright-safe (no
// third-party box art).
//
// Bump IMG_VERSION whenever the box design changes so browsers and the CDN
// fetch the new images instead of a cached older version.
const IMG_VERSION = "2";

export function getProductImage(name: string): string {
  return `/api/product-image?name=${encodeURIComponent(name)}&v=${IMG_VERSION}`;
}

// Box only, transparent background, tightly cropped — used by the homepage
// billboard carousel so just the box floats in the animation.
export function getProductBoxImage(name: string): string {
  return `/api/product-image?name=${encodeURIComponent(name)}&box=1&v=${IMG_VERSION}`;
}
