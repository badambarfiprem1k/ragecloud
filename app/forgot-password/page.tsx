'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight, Loader, CheckCircle } from 'lucide-react'
import { useSupabase } from '@/hooks/useSupabase'
import SetupRequired from '@/components/SetupRequired'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const { supabase, isConfigured } = useSupabase()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Show setup screen if Supabase isn't configured
  if (!isConfigured) {
    return <SetupRequired />
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      setSubmitted(true)
      toast.success('Password reset link sent to your email!')
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center py-12 px-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              <span className="text-white font-bold">RC</span>
            </div>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-white">Reset Your </span>
            <span className="gradient-text">Password</span>
          </h1>
          <p className="text-gray-400">We'll send you a link to reset your password</p>
        </div>

        {/* Reset card */}
        {!submitted ? (
          <div className="p-8 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
            <form onSubmit={handleReset} className="space-y-6">
              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Back to login link */}
            <p className="mt-6 text-center text-gray-400">
              Remember your password?{' '}
              <Link href="/login" className="text-primary hover:text-secondary transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        ) : (
          /* Success state */
          <div className="p-8 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 text-center">
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-green-500/20 rounded-full">
                <CheckCircle size={64} className="text-green-500" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <span className="font-medium text-white">{email}</span>
            </p>

            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg mb-6">
              <p className="text-sm text-gray-300">
                The link will expire in 24 hours. If you don't receive an email, check your spam folder.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              Back to Login
            </Link>

            <p className="mt-6 text-gray-400">
              Didn't receive an email?{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary hover:text-secondary transition-colors font-medium"
              >
                Try again
              </button>
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
