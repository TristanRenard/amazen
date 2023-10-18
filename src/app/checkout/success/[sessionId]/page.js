import Link from 'next/link'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function Page({ params }) {
    const { sessionId } = params

    if (!sessionId.startsWith('cs_')) {
        throw new Error('Incorrect CheckoutSession ID.')
    }

    const checkout_session = await stripe.checkout.sessions.retrieve(sessionId)

    if (checkout_session) {
        return (
            <div className="flex flex-col justify-center items-center gap-2">
                <h1>Merci, votre paiment a bien été valider !</h1>
                <Link href="/" className="p-3 rounded bg-blue-500">
                    Retourner à la page d'accueil
                </Link>
            </div>
        )
    }

    throw new Error('Unknown sessionId')
}
