'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle, Loader, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'resend'>('pending')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    // Check if user just signed up (this is a simple example)
    // In a real app, you might check the session or URL params
    const timer = setTimeout(() => {
      setVerificationStatus('success')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (verificationStatus === 'resend' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown, verificationStatus])

  const handleResendEmail = async () => {
    setLoading(true)
    try {
      // In a real app, you would call Supabase to resend the verification email
      // await supabase.auth.resendSessionFromUrl()
      setVerificationStatus('resend')
      setCountdown(60)
    } catch (error) {
      console.error('Error resending email:', error)
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
        {/* Pending state */}
        {verificationStatus === 'pending' && (
          <>
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  <span className="text-white font-bold">RC</span>
                </div>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="text-white">Verify Your </span>
                <span className="gradient-text">Email</span>
              </h1>
              <p className="text-gray-400">We've sent a verification link to your email</p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                    <Mail size={48} className="text-primary" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                    <Loader size={16} className="text-white animate-spin" />
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-gray-300 mb-2">
                  Check your email for a verification link
                </p>
                <p className="text-sm text-gray-500">
                  Click the link to confirm your email address and activate your account
                </p>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg mb-6">
                <p className="text-sm text-gray-300">
                  The link will expire in 24 hours. If you don't see the email, check your spam folder.
                </p>
              </div>

              <button
                onClick={handleResendEmail}
                disabled={loading}
                className="w-full py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? 'Sending...' : 'Didn\'t receive the email? Resend'}
              </button>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already verified?{' '}
                <Link href="/login" className="text-primary hover:text-secondary transition-colors font-medium">
                  Go to login
                </Link>
              </p>
            </div>
          </>
        )}

        {/* Success state */}
        {verificationStatus === 'success' && (
          <>
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  <span className="text-white font-bold">RC</span>
                </div>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="gradient-text">Email Verified</span>
              </h1>
              <p className="text-gray-400">Your account is all set!</p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-green-500/20 rounded-full animate-bounce">
                  <CheckCircle size={64} className="text-green-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Welcome to RageCloud!</h2>
              <p className="text-gray-400 mb-8">
                Your email has been verified. You're ready to start exploring premium digital products.
              </p>

              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="block px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/shop"
                  className="block px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Browse Products
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Resend confirmation state */}
        {verificationStatus === 'resend' && (
          <>
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  <span className="text-white font-bold">RC</span>
                </div>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                <span className="text-white">Email Sent</span>
              </h1>
              <p className="text-gray-400">We've resent the verification link</p>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 text-center">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-primary/20 rounded-full">
                  <Mail size={48} className="text-primary" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">Check your email again</h2>
              <p className="text-gray-400 mb-8">
                We've sent another verification link. Please check your inbox.
              </p>

              <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  {countdown > 0
                    ? `You can resend again in ${countdown}s`
                    : 'You can resend the email again'}
                </p>
              </div>

              <button
                onClick={handleResendEmail}
                disabled={countdown > 0}
                className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Email'}
              </button>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already verified?{' '}
                <Link href="/login" className="text-primary hover:text-secondary transition-colors font-medium">
                  Go to login
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
