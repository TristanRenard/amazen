'use client'

import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Login() {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState(null)
    const [signIn, setSignIn] = useState('Connexion')
    const router = useRouter()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            if (token) {
                fetch('/api/jwt/verifyToken', {
                    method: 'POST',
                    body: JSON.stringify({
                        usertoken: localStorage.getItem('token'),
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status === 200) {
                            router.push('/')
                        }
                        localStorage.removeItem('token')
                    })
                    .catch((err) => console.log(err))
            }
        }
    }, [])

    /**
     *
     * @param {HTMLFormElement} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSignIn('Chargement...')
        const { email, password } = e.target.elements

        const body = {
            login: {
                email: email.value,
                password: password.value,
            },
        }

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await res.json()

        if (data.status === 200) {
            if (!data.usertoken) {
                localStorage.setItem('token', data.usertoken)
                router.push('/')
            }
            setError('Mauvais mot de passe')
            setIsOpen(true)
            setSignIn('Connexion')
        }
        setError(data.err)
        setIsOpen(true)
    }

    return (
        <main className="bg-white flex flex-col h-full ">
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white border px-16 py-10 border-black">
                        <Dialog.Title className="text-black font-bold text-lg">
                            Erreur :
                        </Dialog.Title>

                        <Dialog.Description className="text-black">
                            {error}
                        </Dialog.Description>
                        <button
                            className="bg-blue-500 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-8"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Connexion vers votre compte
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="/api/users/connect"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Adresse Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="p-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Mot de passe
                                </label>
                                <div className="text-sm">
                                    <Link
                                        href="#"
                                        className="font-semibold text-primary hover:text-secondary text-blue-500"
                                    >
                                        Mot de passe oublié?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="p-2 focus:outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {signIn}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Vous n'êtes pas membre?{' '}
                        <Link
                            href="register"
                            className="font-semibold leading-6 text-primary hover:text-secondary"
                        >
                            Inscription.
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
