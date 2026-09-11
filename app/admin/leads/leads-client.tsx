'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from '@/app/admin/components/logout-button'

export interface Lead {
    id: string | number
    created_at: string
    name: string
    email: string
    phone?: string | null
    service_type?: string | null
    message: string
    status?: string | null
}

interface LeadsClientProps {
    initialLeads: Lead[]
}

const FONT = "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
const THEME_KEY = 'mydev_admin_theme'

// ─── Theme tokens (V3: Ultra-Modern Glass & Glow) ─────────────
const themes = {
    dark: {
        page: '#030712', // Ultra dark background
        bgPattern: 'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.08), transparent 25%)',
        glassBg: 'rgba(15, 23, 42, 0.4)',
        glassBorder: 'rgba(255, 255, 255, 0.05)',
        text: '#f8fafc',
        textMuted: '#94a3b8',
        textSoft: '#64748b',
        primary: '#818cf8',
        rowBg: 'rgba(255, 255, 255, 0.02)',
        rowHoverBg: 'rgba(255, 255, 255, 0.04)',
        rowBorder: 'rgba(255, 255, 255, 0.05)',
        rowHoverBorder: 'rgba(99, 102, 241, 0.3)',
        rowShadow: 'none',
        rowHoverShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99, 102, 241, 0.15)',
        inputBg: 'rgba(0, 0, 0, 0.2)',
        inputBorder: 'rgba(255, 255, 255, 0.1)',
        badgeBg: 'rgba(99, 102, 241, 0.15)',
        badgeText: '#a5b4fc',
        phoneBg: 'rgba(255,255,255,0.03)',
        phoneText: '#cbd5e1',
        modalOverlay: 'rgba(0,0,0,0.8)',
        modalBg: '#0f172a',
        msgBg: 'rgba(0,0,0,0.3)',
        divider: 'rgba(255,255,255,0.05)',
        scrollThumb: 'rgba(255,255,255,0.1)',
    },
    light: {
        page: '#f8fafc', // Light modern gray
        bgPattern: 'radial-gradient(circle at 15% 50%, rgba(99, 102, 241, 0.04), transparent 25%), radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.04), transparent 25%)',
        glassBg: 'rgba(255, 255, 255, 0.7)',
        glassBorder: 'rgba(255, 255, 255, 0.5)',
        text: '#0f172a',
        textMuted: '#64748b',
        textSoft: '#94a3b8',
        primary: '#6366f1',
        rowBg: '#ffffff',
        rowHoverBg: '#ffffff',
        rowBorder: 'rgba(0,0,0,0.05)',
        rowHoverBorder: 'rgba(99, 102, 241, 0.3)',
        rowShadow: '0 2px 8px rgba(0,0,0,0.02)',
        rowHoverShadow: '0 12px 30px rgba(0,0,0,0.08), 0 0 15px rgba(99, 102, 241, 0.05)',
        inputBg: 'rgba(255,255,255,0.8)',
        inputBorder: 'rgba(0,0,0,0.1)',
        badgeBg: '#e0e7ff',
        badgeText: '#4f46e5',
        phoneBg: '#f1f5f9',
        phoneText: '#475569',
        modalOverlay: 'rgba(15,23,42,0.6)',
        modalBg: '#ffffff',
        msgBg: '#f8fafc',
        divider: 'rgba(0,0,0,0.05)',
        scrollThumb: 'rgba(0,0,0,0.1)',
    }
}

export default function LeadsDashboardClient({ initialLeads }: LeadsClientProps) {
    const [isDark, setIsDark] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [serviceFilter, setServiceFilter] = useState('ALL')
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [copiedId, setCopiedId] = useState<string | number | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const saved = localStorage.getItem(THEME_KEY)
        if (saved === 'light') setIsDark(false)
    }, [])

    const t = isDark ? themes.dark : themes.light

    const toggleTheme = useCallback(() => {
        setIsDark(prev => {
            const next = !prev
            localStorage.setItem(THEME_KEY, next ? 'dark' : 'light')
            return next
        })
    }, [])

    const uniqueServices = useMemo(() => {
        const set = new Set<string>()
        initialLeads.forEach(l => { if (l.service_type) set.add(l.service_type) })
        return Array.from(set)
    }, [initialLeads])

    const filteredLeads = useMemo(() => {
        return initialLeads.filter(lead => {
            const q = searchQuery.toLowerCase()
            const match = !q || lead.name?.toLowerCase().includes(q) || lead.email?.toLowerCase().includes(q) || lead.phone?.toLowerCase().includes(q) || lead.message?.toLowerCase().includes(q) || lead.service_type?.toLowerCase().includes(q)
            return match && (serviceFilter === 'ALL' || lead.service_type === serviceFilter)
        })
    }, [initialLeads, searchQuery, serviceFilter])

    const metrics = useMemo(() => {
        const total = initialLeads.length
        const withPhone = initialLeads.filter(l => l.phone && l.phone.trim().length > 4).length
        const svc: Record<string, number> = {}
        initialLeads.forEach(l => { const s = l.service_type || 'Umum'; svc[s] = (svc[s] || 0) + 1 })
        let top = '-', topN = 0
        Object.entries(svc).forEach(([n, c]) => { if (c > topN) { topN = c; top = n } })
        return { total, withPhone, topService: top }
    }, [initialLeads])

    function exportToCSV() {
        if (!initialLeads.length) return
        const h = ['ID', 'Tanggal', 'Nama', 'Email', 'Telepon', 'Layanan', 'Pesan', 'Status']
        const rows = initialLeads.map(l => [l.id, `"${new Date(l.created_at).toLocaleString('id-ID')}"`, `"${(l.name || '').replace(/"/g, '""')}"`, `"${(l.email || '').replace(/"/g, '""')}"`, `"${(l.phone || '').replace(/"/g, '""')}"`, `"${(l.service_type || '').replace(/"/g, '""')}"`, `"${(l.message || '').replace(/"/g, '""')}"`, `"${(l.status || 'Baru').replace(/"/g, '""')}"`])
        const csv = 'data:text/csv;charset=utf-8,' + [h.join(','), ...rows.map(r => r.join(','))].join('\n')
        const a = document.createElement('a'); a.href = encodeURI(csv); a.download = `leads_mydev_${new Date().toISOString().slice(0, 10)}.csv`; document.body.appendChild(a); a.click(); document.body.removeChild(a)
    }

    function sanitizeWA(phone?: string | null) {
        if (!phone) return null
        let c = phone.replace(/[^0-9]/g, '')
        if (c.startsWith('0')) c = '62' + c.slice(1)
        return c
    }

    function handleCopy(text: string, id: string | number) {
        navigator.clipboard.writeText(text); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000)
    }

    if (!isMounted) return null

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: t.page,
            backgroundImage: t.bgPattern,
            backgroundAttachment: 'fixed',
            fontFamily: FONT,
            color: t.text,
            transition: 'background-color 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .floating-row {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateY(0) scale(1);
                }
                .floating-row:hover {
                    transform: translateY(-4px) scale(1.005);
                    z-index: 10;
                }
                .glass-panel {
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: ${t.scrollThumb}; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.5); }
            `}} />

            {/* Floating Top Bar */}
            <div style={{ width: '100%', maxWidth: 1200, padding: '24px 20px 0', position: 'sticky', top: 0, zIndex: 40 }}>
                <header className="glass-panel" style={{
                    minHeight: 120, // Adjusted for the 100px logo
                    background: t.glassBg,
                    border: `1px solid ${t.glassBorder}`,
                    borderRadius: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 32px',
                    boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.05)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                        <Link href="/admin/leads" style={{ display: 'flex', alignItems: 'center' }}>
                            <Image src={isDark ? "/images/logo/MyDEV White.png" : "/images/logo/MyDEV.png"} alt="MyDEV" width={140} height={46} style={{ height: 100, width: 'auto', objectFit: 'contain' }} priority />
                        </Link>
                        <div style={{ width: 1, height: 60, background: t.divider }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: t.primary, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Admin Portal</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: t.text, letterSpacing: '-0.02em' }}>Leads Management</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            style={{
                                width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${t.divider}`,
                                color: t.textMuted, cursor: 'pointer', transition: 'all 0.2s ease'
                            }}
                        >
                            {isDark ? (
                                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                            ) : (
                                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                        <LogoutButton />
                    </div>
                </header>
            </div>

            {/* Main Content Area */}
            <main style={{ width: '100%', maxWidth: 1200, padding: '32px 20px 80px', flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>

                {/* Unified Metrics Panel */}
                <div className="glass-panel" style={{
                    background: t.glassBg,
                    border: `1px solid ${t.glassBorder}`,
                    borderRadius: 24,
                    padding: 32,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 32,
                    boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 20px 40px rgba(0,0,0,0.03)',
                }}>
                    {[
                        { label: 'Total Leads', value: metrics.total, color: '#6366f1', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                        { label: 'Terkonversi / Ada Kontak', value: metrics.withPhone, color: '#10b981', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                        { label: 'Layanan Terpopuler', value: metrics.topService, color: '#f59e0b', d: 'M13 10V3L4 14h7v7l9-11h-7z' },
                    ].map((m, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
                            {i !== 0 && (
                                <div style={{ position: 'absolute', left: -16, top: '10%', bottom: '10%', width: 1, background: t.divider, display: 'block' }} className="lg-show-divider" />
                            )}
                            <div style={{
                                width: 56, height: 56, borderRadius: 16,
                                background: `rgba(${m.color === '#6366f1' ? '99,102,241' : m.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.15)`,
                                border: `1px solid rgba(${m.color === '#6366f1' ? '99,102,241' : m.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.3)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color,
                                boxShadow: `0 0 20px rgba(${m.color === '#6366f1' ? '99,102,241' : m.color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.2)`
                            }}>
                                <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.d} /></svg>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.textMuted, marginBottom: 6 }}>{m.label}</div>
                                <div style={{ fontSize: typeof m.value === 'number' ? 36 : 22, fontWeight: 800, color: t.text, letterSpacing: '-0.03em', lineHeight: 1 }}>{m.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 300 }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
                            <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: t.textMuted }}>
                                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input type="text" placeholder="Cari nama, pesan..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 14, padding: '12px 16px 12px 42px', fontSize: 14, color: t.text, outline: 'none', fontWeight: 500, backdropFilter: 'blur(10px)', transition: 'border-color 0.2s' }} />
                        </div>
                        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 14, padding: '12px 16px', fontSize: 14, color: t.text, outline: 'none', cursor: 'pointer', fontWeight: 600, backdropFilter: 'blur(10px)' }}>
                            <option value="ALL">Semua Layanan</option>
                            {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <button onClick={exportToCSV} disabled={!initialLeads.length} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: isDark ? 'rgba(255,255,255,0.9)' : '#0f172a', border: 'none', borderRadius: 14, color: isDark ? '#0f172a' : '#ffffff', fontSize: 14, fontWeight: 700, cursor: initialLeads.length ? 'pointer' : 'not-allowed', opacity: initialLeads.length ? 1 : 0.5, transition: 'transform 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Export CSV
                    </button>
                </div>

                {/* Data Grid (Floating Rows) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {/* Header Row (Visual only) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr 1fr auto', gap: 16, padding: '0 24px', marginBottom: 4, color: t.textSoft, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        <div>Tanggal</div>
                        <div>Klien</div>
                        <div>Kontak & Layanan</div>
                        <div>Pesan</div>
                        <div style={{ width: 80, textAlign: 'right' }}>Action</div>
                    </div>

                    {filteredLeads.length === 0 ? (
                        <div className="glass-panel" style={{ background: t.glassBg, border: `1px dashed ${t.glassBorder}`, borderRadius: 20, padding: '80px 20px', textAlign: 'center' }}>
                            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>📭</div>
                            <div style={{ fontWeight: 700, fontSize: 18, color: t.text, marginBottom: 8 }}>Belum ada data</div>
                            <div style={{ color: t.textMuted, fontSize: 14 }}>Coba ubah filter pencarian Anda.</div>
                        </div>
                    ) : filteredLeads.map(lead => {
                        const d = new Date(lead.created_at)
                        const waNum = sanitizeWA(lead.phone)
                        return (
                            <div key={lead.id} className="floating-row glass-panel" style={{
                                background: t.rowBg, border: `1px solid ${t.rowBorder}`, borderRadius: 16, padding: '20px 24px',
                                display: 'grid', gridTemplateColumns: '1fr 2fr 1.5fr 1fr auto', gap: 16, alignItems: 'center',
                                boxShadow: t.rowShadow,
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = t.rowHoverBg; e.currentTarget.style.borderColor = t.rowHoverBorder; e.currentTarget.style.boxShadow = t.rowHoverShadow }}
                                onMouseLeave={e => { e.currentTarget.style.background = t.rowBg; e.currentTarget.style.borderColor = t.rowBorder; e.currentTarget.style.boxShadow = t.rowShadow }}
                            >
                                {/* Tanggal */}
                                <div>
                                    <div style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                    <div style={{ fontSize: 12, marginTop: 4, color: t.textMuted }}>{d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</div>
                                </div>

                                {/* Klien */}
                                <div>
                                    <div style={{ fontWeight: 800, color: t.text, fontSize: 15, letterSpacing: '-0.01em', marginBottom: 4 }}>{lead.name}</div>
                                    <a href={`mailto:${lead.email}`} style={{ color: t.primary, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>{lead.email}</a>
                                </div>

                                {/* Kontak & Layanan */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                        <span style={{ fontFamily: 'monospace', color: t.phoneText, fontSize: 13, background: t.phoneBg, padding: '6px 12px', borderRadius: 8, border: `1px solid ${t.divider}` }}>{lead.phone || '—'}</span>
                                        {waNum && (
                                            <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                                <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.768.815 2.79.815 3.182 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.77-5.769-5.77zm3.385 8.163c-.145.408-.847.781-1.177.83-.33.048-.756.071-2.316-.576-1.996-.826-3.266-2.849-3.366-2.982-.099-.133-.807-1.074-.807-2.048 0-.974.509-1.453.69-1.65.181-.198.396-.248.528-.248.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.561 1.37.611 1.47.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.115-.208.257-.297.345-.099.099-.202.207-.087.405.115.198.513.847 1.101 1.37.757.674 1.394.882 1.592.981.198.099.314.083.43-.05.115-.132.495-.578.627-.776.132-.198.264-.165.445-.099.181.066 1.155.545 1.353.644.198.099.33.149.379.231.05.083.05.479-.095.887z" /></svg>
                                            </a>
                                        )}
                                    </div>
                                    <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 12, background: t.badgeBg, color: t.badgeText, fontSize: 12, fontWeight: 700 }}>{lead.service_type || 'Umum'}</span>
                                </div>

                                {/* Pesan */}
                                <div>
                                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', color: t.textSoft, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{lead.message}</p>
                                </div>

                                {/* Action */}
                                <div style={{ textAlign: 'right' }}>
                                    <button onClick={() => setSelectedLead(lead)} style={{ width: 44, height: 44, borderRadius: '50%', background: t.inputBg, border: `1px solid ${t.divider}`, color: t.text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} onMouseEnter={e => { e.currentTarget.style.background = t.primary; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.background = t.inputBg; e.currentTarget.style.color = t.text }}>
                                        <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </main>

            {/* Modal Detail */}
            {selectedLead && (
                <div onClick={e => { if (e.target === e.currentTarget) setSelectedLead(null) }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: t.modalOverlay, backdropFilter: 'blur(12px)', animation: 'fadeIn 0.2s ease-out' }}>
                    <style dangerouslySetInnerHTML={{ __html: `@keyframes fadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(12px); } } @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }` }} />
                    <div style={{ background: t.modalBg, border: `1px solid ${t.glassBorder}`, borderRadius: 32, width: '100%', maxWidth: 560, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <div style={{ padding: '32px 32px 24px', borderBottom: `1px solid ${t.divider}`, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: `linear-gradient(180deg, rgba(99,102,241,0.15) 0%, transparent 100%)`, pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: t.badgeBg, borderRadius: 10, color: t.badgeText, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', boxShadow: '0 0 8px currentColor' }} />
                                        Detail Prospek
                                    </div>
                                    <h3 style={{ fontSize: 28, fontWeight: 800, color: t.text, margin: 0, letterSpacing: '-0.03em' }}>{selectedLead.name}</h3>
                                </div>
                                <button onClick={() => setSelectedLead(null)} style={{ width: 36, height: 36, borderRadius: 12, background: t.inputBg, border: `1px solid ${t.divider}`, color: t.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = t.text} onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
                                    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </div>
                        <div style={{ padding: 32 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 8 }}>EMAIL KLIEN</div>
                                    <a href={`mailto:${selectedLead.email}`} style={{ color: t.text, fontWeight: 600, textDecoration: 'none', fontSize: 15, display: 'block', wordBreak: 'break-all' }}>{selectedLead.email}</a>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 8 }}>NOMOR TELEPON</div>
                                    <div style={{ color: t.text, fontWeight: 600, fontSize: 15, fontFamily: 'monospace' }}>{selectedLead.phone || '—'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 8 }}>LAYANAN</div>
                                    <div style={{ color: t.text, fontWeight: 600, fontSize: 15 }}>{selectedLead.service_type || 'Umum'}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted, marginBottom: 8 }}>WAKTU MASUK</div>
                                    <div style={{ color: t.text, fontWeight: 600, fontSize: 15 }}>{new Date(selectedLead.created_at).toLocaleString('id-ID')}</div>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: t.textMuted }}>PESAN LENGKAP</div>
                                    <button onClick={() => handleCopy(selectedLead.message, selectedLead.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: t.badgeBg, borderRadius: 8, color: t.badgeText, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none' }}>
                                        {copiedId === selectedLead.id ? '✓ Tersalin' : '⧉ Salin Teks'}
                                    </button>
                                </div>
                                <div style={{ background: t.msgBg, border: `1px solid ${t.divider}`, borderRadius: 16, padding: 20, color: t.textSoft, fontSize: 15, lineHeight: 1.7, maxHeight: 240, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>{selectedLead.message}</div>
                            </div>
                        </div>

                        <div style={{ padding: '0 32px 32px', display: 'flex', gap: 16 }}>
                            {sanitizeWA(selectedLead.phone) && (
                                <a href={`https://wa.me/${sanitizeWA(selectedLead.phone)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 16, color: '#10b981', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}>
                                    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.768.815 2.79.815 3.182 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.77-5.769-5.77zm3.385 8.163c-.145.408-.847.781-1.177.83-.33.048-.756.071-2.316-.576-1.996-.826-3.266-2.849-3.366-2.982-.099-.133-.807-1.074-.807-2.048 0-.974.509-1.453.69-1.65.181-.198.396-.248.528-.248.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.561 1.37.611 1.47.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.115-.208.257-.297.345-.099.099-.202.207-.087.405.115.198.513.847 1.101 1.37.757.674 1.394.882 1.592.981.198.099.314.083.43-.05.115-.132.495-.578.627-.776.132-.198.264-.165.445-.099.181.066 1.155.545 1.353.644.198.099.33.149.379.231.05.083.05.479-.095.887z" /></svg>
                                    Hubungi WA
                                </a>
                            )}
                            <a href={`mailto:${selectedLead.email}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px', background: t.primary, border: 'none', borderRadius: 16, color: '#ffffff', fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 8px 20px rgba(99,102,241,0.3)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Balas Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
