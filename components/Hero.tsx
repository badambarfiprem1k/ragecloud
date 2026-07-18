'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-dark-950">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Purple orb */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow" />

        {/* Blue orb */}
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow animation-delay-2000" />

        {/* Pink glow */}
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-screen filter blur-3xl" />
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[length:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-white/5 backdrop-blur-glass border border-white/10 rounded-full hover:border-primary/50 transition-all duration-300">
          <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            ✨ Premium Digital Marketplace
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
          <span className="text-white">Your Ultimate</span>
          <br />
          <span className="gradient-text">Digital Products Hub</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-100">
          Discover premium Minecraft plugins, mods, skripts, and digital assets.
          Built by creators, trusted by thousands.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animation-delay-200">
          <Link
            href="/shop"
            className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Shop Now
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="#features"
            className="px-8 py-4 bg-white/5 backdrop-blur-glass border border-white/20 rounded-lg font-bold text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in animation-delay-300">
          {[
            { label: 'Secure Payments', icon: '🔒' },
            { label: 'Instant Downloads', icon: '⚡' },
            { label: '24/7 Support', icon: '🎯' },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-4 bg-white/5 backdrop-blur-glass border border-white/10 rounded-lg hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 group-hover:scale-125 transition-transform">
                {feature.icon}
              </div>
              <p className="text-sm font-medium text-gray-300">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-slide-up" />
        </div>
      </div>
    </section>
  )
}
