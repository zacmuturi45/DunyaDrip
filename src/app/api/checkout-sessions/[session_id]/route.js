import { createClient } from "@/utils/supabase/client";

const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient;

export async function GET(request, { params }) {
    const get_id = await params;


    try {
        const session = await stripe.checkout.sessions.retrieve(get_id.session_id, {
            expand: ['line_items.data.price.product',
                'payment_intent.payment_method'
            ],
        });



        const orderId = session.metadata?.order_id;
        if (!orderId) throw new Error("Order ID not found in session metadata");

        const payment = session.payment_intent?.payment_method?.card || {};
        const { error: updateError } = await supabase
            .from('client_orders')
            .update({
                total: session.amount_total || 0,
                payment_method: payment.brand || "N/A",
                last_four: payment.last4 || "----",
                created_at: new Date(session.created * 1000).toISOString(),
                status: 'completed',
            })
            .eq('id', orderId);

        if (updateError) throw new Error("Failed to update order with payment details");

        const { data: order, error } = await supabase
            .from('client_orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error || !order) throw new Error("Order not found in database");



        return Response.json({
            customer_email: session.customer_email,
            payment_method: order.payment_method || "N/A",
            payment_last4: order.last_four || "----",
            total: session.amount_total,
            created: session.created,
            shippingOption: order.shipping_option ? JSON.parse(order.shipping_option) : null,
            items: order.products,
            order_id: orderId,
            ...order
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}