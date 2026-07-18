import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'

export default function SetupRequired() {
  return (
    <main className="min-h-screen bg-dark-950 flex items-center justify-center py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-2xl">
        <div className="p-8 bg-red-500/10 backdrop-blur-glass border border-red-500/30 rounded-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500/20 rounded-full">
              <AlertCircle size={48} className="text-red-500" />
            </div>
          </div>

          {/* Title and message */}
          <h1 className="text-3xl font-bold text-white text-center mb-4">
            Supabase Setup Required
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Your application needs Supabase credentials to work. This is a quick setup that takes 2-3 minutes.
          </p>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Create a Supabase Project</h3>
                <p className="text-gray-400">
                  Go to{' '}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    supabase.com
                  </a>{' '}
                  and create a free project
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Get Your Credentials</h3>
                <p className="text-gray-400">
                  Go to Settings → API and copy your Project URL and API keys
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Update .env.local</h3>
                <p className="text-gray-400">
                  Add your credentials to the <code className="bg-dark-800 px-2 py-1 rounded">.env.local</code> file
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Run Database Migration</h3>
                <p className="text-gray-400">
                  Copy the SQL from{' '}
                  <code className="bg-dark-800 px-2 py-1 rounded">
                    supabase/migrations/001_init_schema.sql
                  </code>{' '}
                  and run it in Supabase SQL Editor
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold">
                5
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Restart Dev Server</h3>
                <p className="text-gray-400">
                  Run <code className="bg-dark-800 px-2 py-1 rounded">npm run dev</code> again
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
            >
              Create Supabase Project
              <ArrowRight size={18} />
            </a>

            <Link
              href="/AUTHENTICATION_SETUP.md"
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              View Setup Guide
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Help text */}
          <p className="text-center text-sm text-gray-500 mt-6">
            See <code className="bg-dark-800 px-2 py-1 rounded">AUTHENTICATION_SETUP.md</code> for detailed instructions
          </p>
        </div>
      </div>
    </main>
  )
}
