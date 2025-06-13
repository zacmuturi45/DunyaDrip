import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    const body = await request.json();

    const { items, customer_email, customer_name } = body;

    const line_items = items.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: `${item.name} (Size: ${item.size})`,
            },
            unit_amount: item.amount,
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            customer_email,
            metadata: {
                customer_name,
                items: JSON.stringify(items),
            },
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/cancel?session_id={CHECKOUT_SESSION_ID}`,        });

        return Response.json({ id: session.id });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Stripe session creation failed' }), {
            status: 500,
            headers: { "Content Type": "application/json"}
        });
    }
}