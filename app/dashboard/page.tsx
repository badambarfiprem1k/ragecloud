'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, ArrowLeft, Loader } from 'lucide-react'
import { useSupabase } from '@/hooks/useSupabase'
import SetupRequired from '@/components/SetupRequired'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const { supabase, isConfigured } = useSupabase()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isConfigured) return
    checkAuth()
  }, [isConfigured])

  async function checkAuth() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        router.push('/login')
        return
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single()

      setUser({ ...session.user, ...profile })
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  // Show setup screen if Supabase isn't configured
  if (!isConfigured) {
    return <SetupRequired />
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader size={48} className="text-primary animate-spin" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Back to RageCloud</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-white">Welcome, </span>
            <span className="gradient-text">{user?.full_name || user?.email}</span>
          </h1>
          <p className="text-gray-400">Your RageCloud dashboard</p>
        </div>

        {/* Dashboard grid - Coming soon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Purchased Products', value: '0', color: 'from-primary' },
            { label: 'Downloads', value: '0', color: 'from-secondary' },
            { label: 'Wishlist Items', value: '0', color: 'from-pink-500' },
            { label: 'Pending Orders', value: '0', color: 'from-cyan-500' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-white/20 transition-all"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} to-secondary bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Coming soon sections */}
        <div className="mt-12 space-y-6">
          {[
            { title: 'Recent Orders', icon: '📦' },
            { title: 'Your Downloads', icon: '⬇️' },
            { title: 'Wishlist', icon: '❤️' },
          ].map((section, i) => (
            <div
              key={i}
              className="p-6 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>{section.icon}</span>
                {section.title}
              </h2>
              <div className="text-center py-12">
                <p className="text-gray-400">Coming soon...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
