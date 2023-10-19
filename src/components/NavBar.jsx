import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
    return (
        <nav className='px-5 flex w-full h-[77px] justify-between items-center border-b fixed bg-white z-50'>
            <Image
                className="relative"
                src="/image.png"
                alt="Amazen Logo"
                width={200}
                height={50}
                priority
            />
            <div className='w-1/3 flex'>
                <input className='border-2 px-4 rounded-full w-full border-black' type="text" placeholder='Search' />
                <button>
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 mx-4" />
                </button>
            </div>

            <ul className='flex flex-row-reverse'>
                <li>
                    <Link href='/login' className='p-3 bg-emerald-600 font-bold text-white rounded-md hover:bg-transparent hover:text-emerald-600 transition-all mx-4'>
                        Login
                    </Link>
                </li>
                <li>
                    <Link href='/login' className='p-3 hover:bg-emerald-600 font-bold hover:text-white rounded-md bg-transparent text-emerald-600 transition-all mx-4'>
                        Register
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
