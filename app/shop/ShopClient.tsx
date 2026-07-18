'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, Download, Search, Filter, MoreVertical } from 'lucide-react'
import EmptyState from '@/components/EmptyState'
import { Package } from 'lucide-react'

interface Product {
  id: string
  name: string
  slug: string
  short_description: string
  price: number
  discount_price: number | null
  thumbnail_url: string | null
  rating: number
  downloads: number
  category_id: string
  tags: string[]
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  color: string
}

export default function ShopClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [selectedCategory, searchQuery])

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to load categories')
    }
  }

  async function fetchProducts() {
    try {
      setLoading(true)
      setError(null)
      let url = '/api/products'
      const params = new URLSearchParams()

      if (selectedCategory) params.append('category', selectedCategory)
      if (searchQuery) params.append('search', searchQuery)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch products')
      
      const data = await res.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-28 pb-24 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">Premium </span>
            <span className="gradient-text">Digital Products</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover premium Minecraft plugins, mods, skripts, and digital assets.
          </p>
        </div>

        {/* Search and filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-glass border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-white/5 backdrop-blur-glass border border-white/20 rounded-lg text-white hover:bg-white/10 hover:border-primary/50 transition-all flex items-center justify-center gap-2"
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-min">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === null
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.slug
                      ? 'bg-gradient-to-r from-primary to-secondary text-white'
                      : 'bg-white/5 border border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 mb-8">
            {error}
          </div>
        )}

        {/* Products grid or empty state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-white/5 rounded-xl mb-4" />
                <div className="h-4 bg-white/5 rounded mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <div className="group h-full p-6 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer">
                  {/* Product image */}
                  <div className="relative h-48 mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                      {product.thumbnail_url ? (
                        <img
                          src={product.thumbnail_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <Package size={64} className="text-gray-600" />
                      )}
                    </div>
                  </div>

                  {/* Product info */}
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {product.short_description}
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
                    <div>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        ₹{product.price.toFixed(2)}
                      </span>
                      {product.discount_price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ₹{product.discount_price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
                      Buy
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Products Available"
            description="Check back soon or follow RageCloud for new releases."
            icon={Package}
            action={{ label: 'Back to Home', href: '/' }}
          />
        )}
      </div>
    </section>
  )
}
