"use client";
import { useEffect, useRef } from "react";

export default function PayPalButton({ amount, onSuccess, onError }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Helper to add PayPal script if not present
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const scriptId = "paypal-sdk-script";
    let didCancel = false;

    function addScript() {
      return new Promise((resolve, reject) => {
        if (document.getElementById(scriptId)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }

    async function renderButton() {
      if (!buttonRef.current) return;
      // Clear previous button if any
      buttonRef.current.innerHTML = "";
      if (window.paypal) {
        window.paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "rect", label: "paypal" },
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: String(amount),
                  },
                },
              ],
            }),
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            if (!didCancel && onSuccess) onSuccess(details);
          },
          onError: (err) => {
            if (!didCancel && onError) onError(err);
          },
        }).render(buttonRef.current);
      }
    }

    addScript().then(renderButton);

    return () => {
      didCancel = true;
      if (buttonRef.current) buttonRef.current.innerHTML = "";
    };
    // Only rerender if amount changes
    // eslint-disable-next-line
  }, [amount]);

  return <div ref={buttonRef}></div>;
}