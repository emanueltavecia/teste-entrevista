'use client'
import { Login } from '@/components/login'
import { useEffect, useState } from 'react'

const auth = JSON.parse(localStorage.getItem('logged') || 'false')
console.log(auth)

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (isLoggedIn) {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products)
        })
        .catch((error) => {
          console.error('Error fetching products:', error)
        })
    }
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <div className="text-center max-w-6xl mx-auto px-5">
          <h1 className="font-bold text-3xl my-5">Lista de Produtos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(
              (product: {
                id: string
                title: string
                thumbnail: string
                description: string
                price: number
              }) => (
                <div
                  className="bg-slate-800 rounded-lg p-4 flex flex-col gap-2 justify-center"
                  key={product.id}
                >
                  <h3 className="font-semibold text-xl">{product.title}</h3>
                  <img
                    className="h-40 object-cover rounded-md"
                    src={product.thumbnail}
                    alt=""
                  />
                  <p>{product.description}</p>
                  <p>Preço: R$ {product.price}</p>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}
