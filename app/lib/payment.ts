// PayPal payments are routed to the store's PayPal account by email using
// PayPal's hosted "_xclick" checkout URL (no API keys or SDK required).

export const PAYPAL_EMAIL = "officialkeyshub@gmail.com";

/**
 * Build a PayPal checkout URL that charges `amount` (USD) for `itemName`
 * and pays the store's PayPal account (PAYPAL_EMAIL).
 * `note` is stored on the transaction (e.g. the buyer's delivery email).
 */
export function paypalPaymentUrl(
  itemName: string,
  amount: number | string,
  note?: string
): string {
  const amt =
    typeof amount === "number"
      ? amount.toFixed(2)
      : parseFloat(String(amount).replace(/[^0-9.]/g, "")).toFixed(2);

  const params = new URLSearchParams({
    cmd: "_xclick",
    business: PAYPAL_EMAIL,
    item_name: itemName,
    amount: amt,
    currency_code: "USD",
    no_shipping: "1",
    no_note: "0",
  });
  if (note) params.set("custom", note);

  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}
