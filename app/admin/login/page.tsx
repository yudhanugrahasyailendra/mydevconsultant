'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/app/lib/supabase'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
        if (error) {
            setError('Login gagal — cek email/password')
            return
        }
        router.push('/admin/leads')
    }

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-xl font-bold">Admin Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 rounded"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-black text-white p-2 rounded">
                Masuk
            </button>
        </form>
    )
}