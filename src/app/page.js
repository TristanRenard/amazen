'use client'

import NavBar from '@/components/NavBar'
import Product from '@/components/Product'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/products/getAll')
                const data = await res.json()
                if (data.status === 200) {
                    setData(data.products)
                    console.log(data)
                } else {
                    console.log(data)
                    setError(data.message)
                }
            } catch (err) {
                setError(err.message)
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center">
            <NavBar />
            <Image
                className="relative w-full mt-[77px]"
                src="/banner.png"
                alt="Amazen Logo"
                width={4000}
                height={1000}
                priority
            />
            <h1 className="text-4xl font-bold mt-10">Welcome to Amazen</h1>
            <section className="flex w-full flex-wrap justify-around">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    data && data.map((product) => <Product product={product} />)
                )}
            </section>
        </main>
    )
}
