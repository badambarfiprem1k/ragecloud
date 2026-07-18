'use client'

import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'

export default function EmptyState({
  title = 'No Products Available',
  description = 'Check back soon or follow RageCloud for new releases.',
  icon: Icon = Package,
  action,
}: {
  title?: string
  description?: string
  icon?: any
  action?: { label: string; href: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      {/* Icon */}
      <div className="mb-6 p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl">
        <Icon size={64} className="text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-center max-w-md mb-8">
        {description}
      </p>

      {/* Action button */}
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
        >
          {action.label}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  )
}
