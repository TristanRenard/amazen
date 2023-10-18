import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

/**
 *
 * @param {Request} request
 * @returns
 */
export async function POST(request) {
    const { items } = await request.json()

    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: items ?? [],
            success_url: `${request.headers.origin}/checkout/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.origin}/cart`,
        })

        return Response.json({
            status: 201,
            data: session,
        })
    } catch (err) {
        return Response.json({ status: 500, err: err.message })
    }
}
