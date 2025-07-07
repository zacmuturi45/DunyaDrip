import { useCart } from "@/app/contexts/cart_context";

const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const { shippingOption } = useCart();
    try {
        const { amount } = await req.json();
        const totalAmount = amount + shippingOption.price; // Add shipping cost to the total amount

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: "gbp",
            payment_method_types: ["card"],
        });

        return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Payment intent creation failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}