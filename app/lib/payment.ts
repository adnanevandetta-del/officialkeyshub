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
    item_name: itemName.slice(0, 127), // PayPal caps item names at 127 chars
    amount: amt,
    currency_code: "USD",
    no_shipping: "1",
    no_note: "0",
  });
  if (note) params.set("custom", note);

  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

// ---------------------------------------------------------------- USDT
// Customers send USDT straight to this wallet, then email a screenshot of the
// transaction so the payment can be verified before the key is released.
// USDT_ADDRESS / USDT_NETWORK are shown to USDT buyers. If USDT_ADDRESS is ever
// left empty, the site tells USDT buyers to contact support instead.
export const USDT_ADDRESS = "0x615d993a8c18975a8f29adc23914bacf398c7e81";
export const USDT_NETWORK = "BSC (BEP20)";
export const USDT_PROOF_EMAIL = "officialkeyshub@gmail.com";

export function usdtProofMailto(orderId: string, itemName: string, amount: number, deliveryEmail?: string): string {
  const subject = `USDT payment proof - Order ${orderId}`;
  const body = [
    "Hi, I have sent my USDT payment.",
    "",
    `Order ID: ${orderId}`,
    `Product: ${itemName}`,
    `Amount sent: ${amount.toFixed(2)} USDT`,
    ...(USDT_NETWORK ? [`Network: ${USDT_NETWORK}`] : []),
    "Transaction ID (TxID): ",
    `Delivery email: ${deliveryEmail ?? ""}`,
    "",
    "I have attached a screenshot of the transaction.",
  ].join("\r\n");
  return `mailto:${USDT_PROOF_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
