'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { supabaseClient } from '@/app/lib/supabase'

const THEME_KEY = 'mydev_admin_theme'
const FONT = "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"

// Theme tokens for Login (matching V3 Dashboard)
const themes = {
    dark: {
        page: '#030712',
        bgPattern: 'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.08), transparent 25%)',
        glassBg: 'rgba(15, 23, 42, 0.6)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        glassShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(99, 102, 241, 0.1)',
        text: '#f8fafc',
        textMuted: '#94a3b8',
        inputBg: 'rgba(0, 0, 0, 0.3)',
        inputBorder: 'rgba(255, 255, 255, 0.1)',
        inputFocusBorder: 'rgba(99, 102, 241, 0.5)',
        buttonBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        buttonText: '#ffffff',
        buttonShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
        errorBg: 'rgba(239, 68, 68, 0.1)',
        errorBorder: 'rgba(239, 68, 68, 0.3)',
        errorText: '#fca5a5',
        toggleBg: 'rgba(255,255,255,0.05)',
        toggleBorder: 'rgba(255,255,255,0.1)',
    },
    light: {
        page: '#f8fafc',
        bgPattern: 'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.05), transparent 25%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.05), transparent 25%)',
        glassBg: 'rgba(255, 255, 255, 0.8)',
        glassBorder: 'rgba(255, 255, 255, 0.8)',
        glassShadow: '0 30px 60px rgba(0,0,0,0.05), 0 0 40px rgba(99, 102, 241, 0.05)',
        text: '#0f172a',
        textMuted: '#64748b',
        inputBg: 'rgba(255, 255, 255, 0.9)',
        inputBorder: 'rgba(0, 0, 0, 0.1)',
        inputFocusBorder: '#6366f1',
        buttonBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        buttonText: '#ffffff',
        buttonShadow: '0 8px 20px rgba(99, 102, 241, 0.2)',
        errorBg: '#fef2f2',
        errorBorder: '#fecaca',
        errorText: '#dc2626',
        toggleBg: '#ffffff',
        toggleBorder: 'rgba(0,0,0,0.1)',
    }
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDark, setIsDark] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
        const saved = localStorage.getItem(THEME_KEY)
        if (saved === 'light') setIsDark(false)
    }, [])

    const toggleTheme = useCallback(() => {
        setIsDark(prev => {
            const next = !prev
            localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
            return next
        })
    }, [])

    const t = isDark ? themes.dark : themes.light

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

    if (!isMounted) return null

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: t.page,
            backgroundImage: t.bgPattern,
            backgroundAttachment: 'fixed',
            fontFamily: FONT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'background-color 0.5s ease',
        }}>
            {/* Background Ambient Orbs (Fixed) */}
            <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 65%)', top: '-10%', right: '-5%', pointerEvents: 'none', transition: 'background 0.5s' }} />
            <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 65%)', bottom: '-10%', left: '-5%', pointerEvents: 'none', transition: 'background 0.5s' }} />
            <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)', top: '40%', left: '10%', pointerEvents: 'none', transition: 'background 0.5s' }} />

            {/* Theme Toggle Button (Top Right) */}
            <button
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                    position: 'absolute', top: 24, right: 24, zIndex: 50,
                    width: 44, height: 44, borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: t.toggleBg,
                    border: `1px solid ${t.toggleBorder}`,
                    color: t.textMuted,
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    backdropFilter: 'blur(12px)'
                }}
                onMouseEnter={e => e.currentTarget.style.color = t.text}
                onMouseLeave={e => e.currentTarget.style.color = t.textMuted}
            >
                {isDark ? (
                    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                ) : (
                    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>

            {/* Centered Glass Card */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: 440,
                padding: '48px 40px',
                margin: '0 24px',
                background: t.glassBg,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${t.glassBorder}`,
                borderRadius: 32,
                boxShadow: t.glassShadow,
                display: 'flex',
                flexDirection: 'column',
                animation: 'cardEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes cardEnter {
                        from { opacity: 0; transform: translateY(40px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    .custom-input {
                        width: 100%; box-sizing: border-box;
                        background: ${t.inputBg}; border: 1.5px solid ${t.inputBorder}; border-radius: 16px;
                        padding: 16px 16px 16px 48px; fontSize: 15px; color: ${t.text}; font-weight: 500;
                        outline: none; transition: all 0.2s ease;
                    }
                    .custom-input:focus {
                        border-color: ${t.inputFocusBorder};
                        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                    }
                    .custom-input::placeholder { color: ${t.textMuted}; opacity: 0.7; }
                `}} />

                {/* Logo Area */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        src={isDark ? "/images/logo/MyDEV White.png" : "/images/logo/MyDEV.png"}
                        alt="MyDEV"
                        width={180}
                        height={60}
                        style={{ height: 150, width: 'auto', objectFit: 'contain', marginBottom: 24 }}
                        priority
                    />
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: t.text, letterSpacing: '-0.025em', margin: '0 0 8px', textAlign: 'center' }}>
                        Selamat datang
                    </h1>
                    <p style={{ color: t.textMuted, fontSize: 14, margin: 0, fontWeight: 500, textAlign: 'center' }}>
                        Masuk untuk mengelola data leads klien Anda.
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div style={{ marginBottom: 24, padding: '14px 16px', background: t.errorBg, border: `1px solid ${t.errorBorder}`, borderRadius: 16, color: t.errorText, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, animation: 'cardEnter 0.3s ease-out' }}>
                        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Email Input */}
                    <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: t.text, marginBottom: 8, letterSpacing: '0.02em' }}>
                            Alamat Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', display: 'flex', color: t.textMuted, pointerEvents: 'none' }}>
                                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                required
                                placeholder="Masukan email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="custom-input"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: t.text, letterSpacing: '0.02em' }}>
                                Password
                            </label>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', display: 'flex', color: t.textMuted, pointerEvents: 'none' }}>
                                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="custom-input"
                                style={{ paddingRight: 48 }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                style={{
                                    position: 'absolute', top: '50%', right: 12, transform: 'translateY(-50%)',
                                    background: 'none', border: 'none', color: t.textMuted, cursor: 'pointer',
                                    display: 'flex', padding: 4, transition: 'color 0.2s'
                                }}
                                onMouseEnter={e => (e.currentTarget.style.color = t.text)}
                                onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}
                            >
                                {showPassword ? (
                                    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.29-3.29" />
                                    </svg>
                                ) : (
                                    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            marginTop: 12,
                            width: '100%',
                            padding: '16px',
                            background: t.buttonBg,
                            border: 'none',
                            borderRadius: 16,
                            color: t.buttonText,
                            fontSize: 15,
                            fontWeight: 700,
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            boxShadow: t.buttonShadow,
                            opacity: isLoading ? 0.7 : 1,
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => !isLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                        onMouseLeave={e => !isLoading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {isLoading ? (
                            <>
                                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin 1s linear infinite' }}>
                                    <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" opacity="0.3" />
                                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <>
                                <span>Masuk</span>
                                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Copyright */}
            <div style={{ position: 'absolute', bottom: 24, textAlign: 'center', color: t.textMuted, fontSize: 13, zIndex: 10 }}>
                &copy; {new Date().getFullYear()} MyDEV IT Consultant. All rights reserved.
            </div>
        </div>
    )
}