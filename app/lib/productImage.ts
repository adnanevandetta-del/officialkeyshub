// Every product gets a clean, branded product image generated on the fly
// by /api/product-image (correct logo, colors and product name). This keeps
// imagery accurate to each product and copyright-safe (no third-party box art).

export function getProductImage(name: string): string {
  return `/api/product-image?name=${encodeURIComponent(name)}`;
}
