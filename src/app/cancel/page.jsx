"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function CancelPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReturnToCheckout = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    setError("");
    try {
      const { loadStripe } = await import("@stripe/stripe-js");
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      if (!stripe) throw new Error("Stripe.js failed to load");
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) setError(error.message);
    } catch (err) {
      setError(err.message || "Failed to redirect to Stripe.");
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="cancel-page">
      <div className="cancel-content">
        <Image
          src="/cancel.svg"
          alt="Payment Cancelled"
          width={120}
          height={120}
          className="cancel-image"
        />
        <h2>Payment Cancelled</h2>
        <p>
          Your payment was not completed. If this was a mistake or you changed your mind, you can try again.
        </p>
        <button
          className="retry-link"
          onClick={handleReturnToCheckout}
          disabled={!sessionId || loading}
        >
          {loading ? "Redirecting..." : "Return to Checkout"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <a href="/" className="home-link">
          Back to Home
        </a>
      </div>
    </div>
  );
}