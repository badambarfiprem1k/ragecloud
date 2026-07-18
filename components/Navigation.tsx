'use client'

import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-dark-950/40 backdrop-blur-glass border-b border-white/10" />

      {/* Navigation content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
              <span className="text-white font-bold text-sm">RC</span>
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:inline">
              RageCloud
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group"
            >
              <ShoppingCart size={20} className="text-gray-300 group-hover:text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/50 transition-all">
                0
              </span>
            </Link>

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={20} className="text-gray-300" />
            ) : (
              <Menu size={20} className="text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-dark-900/95 backdrop-blur-glass border-b border-white/10 animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <Link
                  href="/login"
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
