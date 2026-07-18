import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'RageCloud - Premium Digital Marketplace',
  description: 'The ultimate marketplace for Minecraft plugins, mods, skripts, and digital assets.',
  keywords: ['minecraft', 'plugins', 'mods', 'marketplace', 'digital', 'assets'],
  authors: [{ name: 'RageCloud' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-950 text-gray-50 selection:bg-purple-600 selection:text-white">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(30, 41, 59, 0.95)',
              color: '#f9fafb',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </body>
    </html>
  )
}
