'use client'

import Link from 'next/link'
import { ShoppingCart as ShoppingCartIcon, ArrowLeft } from 'lucide-react'
import EmptyState from '@/components/EmptyState'

export default function CartPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Shopping Cart</h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Empty state */}
      <div className="py-24">
        <EmptyState
          title="Your Cart is Empty"
          description="Start shopping to add items to your cart. Explore our premium digital products now."
          icon={ShoppingCartIcon}
          action={{ label: 'Browse Products', href: '/shop' }}
        />
      </div>
    </main>
  )
}
