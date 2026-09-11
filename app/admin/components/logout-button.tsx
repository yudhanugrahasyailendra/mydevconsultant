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
            className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            title="Keluar dari Admin"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
            {isLoading ? 'Keluar...' : 'Logout'}
        </button>
    )
}
