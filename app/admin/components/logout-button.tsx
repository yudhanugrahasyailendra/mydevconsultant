'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/app/lib/supabase'

export default function LogoutButton() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleLogout() {
        try {
            setIsLoading(true)
            await supabaseClient.auth.signOut()
            router.push('/admin/login')
            router.refresh()
        } catch (error) {
            console.error('Gagal logout:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl border border-rose-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            title="Keluar dari sesi Admin"
        >
            {isLoading ? (
                <svg className="animate-spin h-3.5 w-3.5 text-rose-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
            )}
            <span>{isLoading ? 'Keluar...' : 'Keluar'}</span>
        </button>
    )
}
