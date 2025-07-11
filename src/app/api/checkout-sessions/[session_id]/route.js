const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request, { params }) {
    try {
        const session = await stripe.checkout.sessions.retrieve(params.session_id, {
            expand: ['line_items.data.price.product',
                'payment_intent.payment_method'
            ],
        });

        const shippingOption = session.metadata?.shippingOption ? JSON.parse(session.metadata.shippingOption) : null;


        const items = session.metadata?.items
            ? JSON.parse(session.metadata.items)
            : session.line_items?.data.map(item => ({
                name: item.price.product.name,
                amount: item.price.unit_amount,
                quantity: item.quantity,
                size: item.description?.match(/Size: (\w+)/)?.[1] || ''
            }));

        const payment = session.payment_intent.payment_method.card;
        return Response.json({
            customer_email: session.customer_email,
            payment_method: {
                brand: payment.brand,
                last4: payment.last4,
            },
            total: session.amount_total,
            created: session.created,
            shippingOption: shippingOption,
            ...session,
            items
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}