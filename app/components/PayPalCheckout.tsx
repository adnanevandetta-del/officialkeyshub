"use client";

import { useEffect } from "react";

interface PayPalCheckoutProps {
  productName: string;
  price: string;
  onSuccess?: () => void;
}

export default function PayPalCheckout({ productName, price, onSuccess }: PayPalCheckoutProps) {
  const numericPrice = parseFloat(price.replace("$", ""));

  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: productName,
                    amount: {
                      value: numericPrice.toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: async (data: any, actions: any) => {
              const order = await actions.order.capture();
              console.log("Payment successful:", order);
              
              // Send order details to your backend/email
              await fetch("/api/send-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  productName,
                  price,
                  orderId: order.id,
                  payerEmail: order.payer.email_address,
                  payerName: order.payer.name.given_name + " " + order.payer.name.surname,
                }),
              });

              if (onSuccess) onSuccess();
              alert("Payment successful! Check your email for the product key.");
            },
            onError: (err: any) => {
              console.error("PayPal error:", err);
              alert("Payment failed. Please try again or contact support.");
            },
          })
          .render("#paypal-button-container");
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [productName, numericPrice]);

  return (
    <div>
      <div id="paypal-button-container" className="w-full"></div>
    </div>
  );
}

declare global {
  interface Window {
    paypal: any;
  }
}
