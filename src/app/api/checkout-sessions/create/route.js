import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
    const body = await request.json();

    const { customer_email, customer_name, shippingOption, order_id, items } = body;

    const line_items = items.map(item => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: `${item.name} (Size: ${item.size})`,
            },
            unit_amount: item.amount,
        },
        quantity: item.quantity,
    }));

    if (shippingOption?.price && shippingOption?.method) {
    line_items.push({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: `Shipping (${shippingOption.region} - ${shippingOption.method})`,
            },
            unit_amount: Math.round(shippingOption.price * 100), // Stripe expects amounts in pence
        },
        quantity: 1,
    });
}


    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            customer_email,
            shipping_address_collection: {
                allowed_countries: ['US', 'GB', 'FR', 'BG', 'NL', 'GE']
            },
            // shipping: shippingDetails
            //     ? {
            //         name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
            //         phone: shippingDetails.phone,
            //         address: {
            //             line1: shippingDetails.address1 || "",
            //             line2: shippingDetails.address2 || "",
            //             city: shippingDetails.city || "",
            //             postal_code: shippingDetails.postalCode || "",
            //             country: shippingDetails.country || "",
            //         }
            //     }
            //     : undefined,
            metadata: {
                customer_name,
                order_id,
            },
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/cancel?session_id={CHECKOUT_SESSION_ID}`,
        });

        return Response.json({ id: session.id });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message || 'Stripe session creation failed' }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}