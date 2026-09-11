'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabaseClient } from '@/app/lib/supabase'

const THEME_KEY = 'mydev_admin_theme'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const saved = localStorage.getItem(THEME_KEY)
        if (saved === 'dark') setIsDark(true)
    }, [])

    const toggleTheme = useCallback(() => {
        setIsDark(prev => {
            const next = !prev
            localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
            return next
        })
    }, [])

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        try {
            const { error: authError } = await supabaseClient.auth.signInWithPassword({
                email: email.trim(),
                password,
            })
            if (authError) {
                setError('Login gagal. Periksa email dan password Anda.')
                return
            }
            router.push('/admin/leads')
            router.refresh()
        } catch (err: any) {
            setError(err?.message || 'Terjadi kesalahan sistem.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
        }}>

            {/* ─── Left Panel: Branding ─── */}
            <div style={{
                display: 'none',
                width: '45%',
                flexShrink: 0,
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px 48px',
                background: 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
                className="lg-panel"
            >
                {/* Glow orbs */}
                <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 65%)', top: -180, right: -120, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 65%)', bottom: -80, left: -80, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 65%)', top: '40%', right: '10%', pointerEvents: 'none' }} />

                {/* Logo */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <Image src="/images/logo/MyDEV White.png" alt="MyDEV" width={200} height={100} style={{ height: 100, width: 'auto', objectFit: 'contain' }} />
                    </div>
                </div>

                {/* Hero Copy */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 999, padding: '5px 14px', marginBottom: 24 }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#818cf8', boxShadow: '0 0 8px #818cf8' }} />
                        <span style={{ color: '#a5b4fc', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Admin Portal</span>
                    </div>
                    <h2 style={{ fontSize: 44, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
                        Kelola semua<br />
                        leads klien<br />
                        <span style={{ background: 'linear-gradient(135deg, #818cf8, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            dengan mudah.
                        </span>
                    </h2>
                    <p style={{ color: 'rgba(241,245,249,0.5)', fontSize: 15, lineHeight: 1.7, margin: 0, maxWidth: 340 }}>
                        Portal administrasi MyDEV IT Consultant untuk memantau dan merespons prospek klien masuk secara real-time.
                    </p>

                    {/* Stat pills */}
                    <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
                        {[
                            { label: 'Export CSV', icon: '↓' },
                            { label: 'Real-time Data', icon: '⚡' },
                            { label: 'WA Direct', icon: '💬' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '7px 14px' }}>
                                <span style={{ fontSize: 13 }}>{item.icon}</span>
                                <span style={{ color: 'rgba(241,245,249,0.7)', fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ position: 'relative', zIndex: 1, color: 'rgba(255,255,255,0.25)', fontSize: 13, fontWeight: 500 }}>
                    © {new Date().getFullYear()} MyDEV IT Consultant
                </div>
            </div>

            {/* ─── Right Panel: Form ─── */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '48px 24px',
                background: isDark ? '#0f172a' : '#ffffff',
                position: 'relative',
                transition: 'background 0.3s',
            }}>
                {/* Subtle grid pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: isDark
                        ? 'radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)'
                        : 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    opacity: 0.5,
                    pointerEvents: 'none',
                }} />

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, width: 38, height: 38, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9', border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : '#e2e8f0'}`, color: isDark ? '#94a3b8' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    {isDark ? (
                        <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                    ) : (
                        <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                </button>

                {/* Form container */}
                <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

                    {/* Mobile-only logo */}
                    <div className="lg-hide" style={{ marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
                        <Image src="/images/logo/MyDEV White.png" alt="MyDEV" width={180} height={48} style={{ height: 44, width: 'auto', objectFit: 'contain' }} priority />
                    </div>

                    {/* Heading */}
                    <div style={{ marginBottom: 36 }}>
                        <h1 style={{ fontSize: 30, fontWeight: 800, color: isDark ? '#f1f5f9' : '#0f172a', letterSpacing: '-0.025em', margin: '0 0 8px', transition: 'color 0.3s' }}>
                            Selamat datang! 👋
                        </h1>
                        <p style={{ color: isDark ? '#64748b' : '#64748b', fontSize: 15, margin: 0, fontWeight: 500 }}>
                            Masuk ke panel admin MyDEV untuk mengelola leads.
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{ marginBottom: 20, padding: '13px 16px', background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 12, color: '#dc2626', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div style={{ marginBottom: 18 }}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 7 }}>
                                Alamat Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', left: 15, transform: 'translateY(-50%)', display: 'flex', color: '#9ca3af', pointerEvents: 'none' }}>
                                    <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="Masukan email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{
                                        width: '100%', boxSizing: 'border-box',
                                        background: '#f8fafc',
                                        border: '1.5px solid #e2e8f0',
                                        borderRadius: 12,
                                        padding: '13px 16px 13px 44px',
                                        fontSize: 14, color: '#111827', fontWeight: 500,
                                        outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; e.target.style.background = '#fff' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc' }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: 28 }}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 7 }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '50%', left: 15, transform: 'translateY(-50%)', display: 'flex', color: '#9ca3af', pointerEvents: 'none' }}>
                                    <svg width={17} height={17} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{
                                        width: '100%', boxSizing: 'border-box',
                                        background: '#f8fafc',
                                        border: '1.5px solid #e2e8f0',
                                        borderRadius: 12,
                                        padding: '13px 50px 13px 44px',
                                        fontSize: 14, color: '#111827', fontWeight: 500,
                                        outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
                                    }}
                                    onFocus={e => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; e.target.style.background = '#fff' }}
                                    onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#f8fafc' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', top: '50%', right: 14, transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 0 }}
                                >
                                    {showPassword ? (
                                        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                                    ) : (
                                        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '14px 20px',
                                background: isLoading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                border: 'none',
                                borderRadius: 12,
                                color: '#fff',
                                fontSize: 15,
                                fontWeight: 700,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                boxShadow: isLoading ? 'none' : '0 4px 16px rgba(99,102,241,0.4)',
                                transition: 'transform 0.15s, box-shadow 0.15s',
                                letterSpacing: '0.01em',
                            }}
                            onMouseEnter={e => { if (!isLoading) { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(99,102,241,0.45)' } }}
                            onMouseLeave={e => { if (!isLoading) { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(99,102,241,0.4)' } }}
                        >
                            {isLoading ? (
                                <>
                                    <svg style={{ animation: 'spin 1s linear infinite', width: 18, height: 18 }} fill="none" viewBox="0 0 24 24">
                                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                        <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Masuk...</span>
                                </>
                            ) : (
                                <>
                                    <span>Masuk</span>
                                    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* CSS for responsive left panel */}
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @media (min-width: 1024px) {
                    .lg-panel { display: flex !important; }
                    .lg-hide { display: none !important; }
                }
            `}</style>
        </div>
    )
}