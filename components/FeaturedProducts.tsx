'use client'

import Link from 'next/link'
import { Star, Download } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
  downloads: number
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Ultimate Teleport Plugin',
    description: 'Advanced teleportation system with warps and homes',
    price: 29.99,
    image: '/products/placeholder-1.svg',
    rating: 4.9,
    category: 'Plugins',
    downloads: 1250,
  },
  {
    id: 2,
    name: 'Magic Spells Mod',
    description: 'Enchanting magic system for your server',
    price: 39.99,
    image: '/products/placeholder-2.svg',
    rating: 4.8,
    category: 'Mods',
    downloads: 892,
  },
  {
    id: 3,
    name: 'Economy Skript',
    description: 'Complete economy system with shops and banks',
    price: 19.99,
    image: '/products/placeholder-3.svg',
    rating: 5.0,
    category: 'Skripts',
    downloads: 2103,
  },
]

export default function FeaturedProducts() {
  return (
    <section className="relative py-24 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Products</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Handpicked premium products from our marketplace.
            Quality you can trust, features you'll love.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="group h-full p-6 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
                {/* Product image container */}
                <div className="relative h-48 mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                  <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-primary/80 backdrop-blur-glass rounded-full text-xs font-bold text-white">
                    {product.category}
                  </div>
                </div>

                {/* Product info */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
                  {product.description}
                </p>

                {/* Rating and downloads */}
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 ml-1 text-xs">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400">
                    <Download size={14} />
                    <span className="text-xs">{product.downloads}</span>
                  </div>
                </div>

                {/* Price and button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    ₹{product.price.toFixed(2)}
                  </span>

                  <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                    Buy
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block px-8 py-4 bg-white/5 backdrop-blur-glass border border-white/20 rounded-lg font-bold text-white hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
