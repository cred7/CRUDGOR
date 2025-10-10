"use client";
import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  inStock: boolean;
  description?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "gm-shirt-green",
    name: "Gor Mahia Home Shirt 2025",
    price: 45,
    imageUrl: "/kit.png",
    isNew: true,
    inStock: true,
    description: "Official 2025 home shirt in green & white stripes",
  },
  {
    id: "gm-away-shirt",
    name: "Gor Mahia Away Shirt",
    price: 40,
    imageUrl: "/kit.png",
    inStock: true,
    description: "Away kit with accents and sponsor logos",
  },
  {
    id: "gm-scarf",
    name: "Gor Mahia Fan Scarf",
    price: 15,
    imageUrl: "/images/shop/gm-scarf.jpg",
    inStock: true,
    description: "Wool scarf with club colors",
  },
  {
    id: "gm-cap",
    name: "Gor Mahia Cap",
    price: 20,
    imageUrl: "/images/shop/gm-cap.jpg",
    inStock: false,
    description: "Adjustable cap with logo",
  },
  {
    id: "gm-hoodie",
    name: "Gor Mahia Hoodie",
    price: 60,
    imageUrl: "/images/shop/gm-hoodie.jpg",
    inStock: true,
    description: "Hoodie with club crest and sponsor branding",
  },
  {
    id: "gm-flag",
    name: "Gor Mahia Flag",
    price: 12,
    imageUrl: "/images/shop/gm-flag.jpg",
    inStock: true,
    description: "Large club flag for fan displays",
  },
];

export default function MerchShop() {
  const [cart, setCart] = useState<Record<string, number>>({});

  function addToCart(product: Product) {
    if (!product.inStock) return;
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 flex text-black flex-row-gap-3">
        Gor Mahia Shop
      </h2>
      <div className="flex max-sm:flex-col gap-3 justify-between">
        <div className="sm:flex-2 grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-60">
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute top-1 right-1">
                {
                  cart && <span>{cart[p.id]}</span>
                  // Object.entries(cart).map(([pid, qty]) => {
                  //   const prod = PRODUCTS.find((x) => x.id === pid)!;
                  //   return <span key={pid}>{qty}</span>;
                  // })
                }
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-black text-lg">{p.name}</h3>
                <p className="text-green-700 font-bold mt-1">
                  Ksh. {p.price.toFixed(2)}
                </p>
                {p.isNew && (
                  <span className="inline-block mt-2 px-2 py-1 bg-green-600 text-black text-xs rounded">
                    New
                  </span>
                )}
                <p className="mt-2 text-black text-sm">{p.description}</p>

                <button
                  onClick={() => addToCart(p)}
                  disabled={!p.inStock}
                  className={`mt-4 w-full px-4 py-2 rounded-full flex items-center justify-center Ksh.   {
                  p.inStock
                    ? "bg-green-600 text-black hover:bg-green-700"
                    : "bg-gray-300  cursor-not-allowed"
                } transition`}
                >
                  <FaShoppingCart className="mr-2" />
                  {p.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart summary for demo */}
        {Object.keys(cart).length > 0 && (
          <div className="mt-1 p-4 sm:flex-1 bg-gray-50 rounded shadow text-black">
            <h3 className="text-black font-bold text-xl mb-4">Cart Preview</h3>
            <button onClick={() => setCart({})}> clear the cart array</button>
            <ul className="space-y-2">
              {Object.entries(cart).map(([pid, qty]) => {
                const prod = PRODUCTS.find((x) => x.id === pid)!;
                return (
                  <li key={pid} className="flex justify-between">
                    <span>
                      {prod.name} × {qty}
                    </span>
                    <span>Ksh. {(prod.price * qty).toFixed(2)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg">
                Total: Ksh.
                {Object.entries(cart)
                  .reduce((sum, [pid, qty]) => {
                    const prod = PRODUCTS.find((x) => x.id === pid)!;
                    return sum + prod.price * qty;
                  }, 0)
                  .toFixed(2)}
              </span>
              <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
