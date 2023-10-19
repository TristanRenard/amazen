import { ShoppingCartIcon } from "@heroicons/react/24/outline";


export default function Product({product}){
    

    const handleClick = (pid) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            if (!token) {
                window.location.href = '/login'
            }
            else{
                fetch('/api/user/addProductInCart', {
                    method: 'POST',
                    body: JSON.stringify({
                        token: token,
                        productid: pid
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err))
            }
        }
    }

    return(
        <div className='flex flex-col items-center justify-center w-[30%] py-4'>
            <img className="h-[336px] w-[336px] object-cover" src={product.imageUrl} alt={product.title} />
            <h2 className="text-2xl font-bold">
                {product.title}
            </h2>
            <p>{product.price}$</p>
            <button 
            className="flex bg-emerald-600 font-bold text-white p-3 rounded-full"
            onClick={() => handleClick(product.id)}
            > 
                Add to Cart 
                <ShoppingCartIcon class="h-6 w-6 ml-2" />
            </button>
        </div>
    )
}
