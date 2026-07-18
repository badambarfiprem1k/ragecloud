import Link from 'next/link'
import { Mail, Twitter, Github } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { label: 'Shop', href: '/shop' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' },
    ],
  }

  return (
    <footer className="relative bg-dark-950 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand column */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all">
                  <span className="text-white font-bold text-sm">RC</span>
                </div>
                <span className="font-bold text-lg gradient-text">RageCloud</span>
              </Link>
              <p className="text-gray-400 text-sm mb-6">
                Premium digital marketplace for Minecraft creators and enthusiasts.
              </p>
              {/* Social links */}
              <div className="flex gap-4">
                {[
                  { icon: Twitter, href: '#twitter' },
                  { icon: Github, href: '#github' },
                  { icon: Mail, href: '#email' },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="p-2 bg-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300 group"
                  >
                    <social.icon size={18} className="text-gray-400 group-hover:text-primary" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold text-white mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-8" />

          {/* Bottom footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} RageCloud. All rights reserved.
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
