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

// ─── Theme tokens ───────────────────────────────────────────────────────────
const themes = {
    dark: {
        page: '#0f172a',
        sidebar: '#0a0f1e',
        sidebarBorder: 'rgba(255,255,255,0.06)',
        topbar: 'rgba(15,23,42,0.95)',
        topbarBorder: 'rgba(255,255,255,0.06)',
        text: '#e2e8f0',
        textMuted: '#64748b',
        textSoft: '#94a3b8',
        card: 'rgba(255,255,255,0.03)',
        cardBorder: 'rgba(255,255,255,0.07)',
        tableHead: 'rgba(0,0,0,0.15)',
        tableRow: 'rgba(255,255,255,0.03)',
        tableDiv: 'rgba(255,255,255,0.04)',
        toolbar: 'rgba(0,0,0,0.2)',
        input: 'rgba(255,255,255,0.05)',
        inputBorder: 'rgba(255,255,255,0.1)',
        iconMuted: '#475569',
        titleColor: '#f1f5f9',
        badge: { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.3)', text: '#a5b4fc' },
        phone: { bg: 'rgba(0,0,0,0.25)', text: '#94a3b8' },
        detailBtn: { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: '#cbd5e1' },
        modal: { bg: '#111827', border: 'rgba(255,255,255,0.1)', overlay: 'rgba(0,0,0,0.7)', field: 'rgba(255,255,255,0.04)', fieldBorder: 'rgba(255,255,255,0.07)' },
        msgBg: 'rgba(0,0,0,0.3)',
        msgBorder: 'rgba(255,255,255,0.07)',
    },
    light: {
        page: '#f1f5f9',
        sidebar: '#1e293b',
        sidebarBorder: 'rgba(0,0,0,0.1)',
        topbar: 'rgba(255,255,255,0.95)',
        topbarBorder: '#e2e8f0',
        text: '#0f172a',
        textMuted: '#64748b',
        textSoft: '#475569',
        card: '#ffffff',
        cardBorder: '#e2e8f0',
        tableHead: '#f8fafc',
        tableRow: '#fafafa',
        tableDiv: '#f1f5f9',
        toolbar: '#f8fafc',
        input: '#ffffff',
        inputBorder: '#cbd5e1',
        iconMuted: '#94a3b8',
        titleColor: '#0f172a',
        badge: { bg: '#ede9fe', border: '#ddd6fe', text: '#7c3aed' },
        phone: { bg: '#f1f5f9', text: '#475569' },
        detailBtn: { bg: '#ffffff', border: '#e2e8f0', text: '#475569' },
        modal: { bg: '#ffffff', border: '#e2e8f0', overlay: 'rgba(15,23,42,0.5)', field: '#f8fafc', fieldBorder: '#e2e8f0' },
        msgBg: '#f8fafc',
        msgBorder: '#e2e8f0',
    }
}

export default function LeadsDashboardClient({ initialLeads }: LeadsClientProps) {
    const [isDark, setIsDark] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [serviceFilter, setServiceFilter] = useState('ALL')
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [copiedId, setCopiedId] = useState<string | number | null>(null)

    const t = isDark ? themes.dark : themes.light

    useEffect(() => {
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

    return (
        <div style={{ minHeight: '100vh', background: t.page, fontFamily: FONT, color: t.text, transition: 'background 0.3s, color 0.3s' }}>

            {/* Sidebar */}
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 64, background: t.sidebar, borderRight: `1px solid ${t.sidebarBorder}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20, paddingBottom: 20, zIndex: 40, gap: 8, transition: 'background 0.3s' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Image src="/images/logo/MyDEV White.png" alt="MyDEV" width={48} height={48} style={{ width: 48, height: 'auto', objectFit: 'contain' }} />
                </Link>
                {[
                    { d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', active: true },
                    { d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', active: false },
                ].map((item, i) => (
                    <div key={i} style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: item.active ? 'rgba(99,102,241,0.2)' : 'transparent', border: item.active ? '1px solid rgba(99,102,241,0.4)' : '1px solid transparent', color: item.active ? '#818cf8' : (isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)') }}>
                        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.d} /></svg>
                    </div>
                ))}
                <div style={{ flex: 1 }} />
                <Link href="/" target="_blank" style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.5)', border: '1px solid transparent' }}>
                    <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Link>
            </div>

            {/* Main */}
            <div style={{ marginLeft: 64, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Top Bar */}
                <header style={{ height: 60, background: t.topbar, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${t.topbarBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 30, transition: 'background 0.3s, border-color 0.3s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: t.textMuted }}>Admin Dashboard</span>
                        <span style={{ color: t.textMuted, fontSize: 14 }}>·</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: t.titleColor }}>Leads Management</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`, color: isDark ? '#94a3b8' : '#475569', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                            {isDark ? (
                                /* Sun icon */
                                <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
                            ) : (
                                /* Moon icon */
                                <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                        <LogoutButton />
                    </div>
                </header>

                {/* Content */}
                <main style={{ flex: 1, padding: '28px 28px 60px' }}>

                    {/* Page Title */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6366f1', marginBottom: 6 }}>Client Leads</div>
                            <h1 style={{ fontSize: 28, fontWeight: 800, color: t.titleColor, letterSpacing: '-0.025em', margin: 0 }}>Manajemen Leads</h1>
                            <p style={{ fontSize: 14, color: t.textMuted, marginTop: 4 }}>Daftar prospek klien yang masuk melalui formulir kontak.</p>
                        </div>
                        <button onClick={exportToCSV} disabled={!initialLeads.length} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', borderRadius: 10, color: '#818cf8', fontSize: 13, fontWeight: 700, cursor: initialLeads.length ? 'pointer' : 'not-allowed', opacity: initialLeads.length ? 1 : 0.4 }}>
                            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export CSV
                        </button>
                    </div>

                    {/* Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
                        {[
                            { label: 'Total Leads', value: metrics.total, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                            { label: 'Dengan Kontak', value: metrics.withPhone, color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                            { label: 'Layanan Terpopuler', value: metrics.topService, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', d: 'M13 10V3L4 14h7v7l9-11h-7z' },
                        ].map((m, i) => (
                            <div key={i} style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16, transition: 'background 0.3s, border-color 0.3s' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: m.bg, border: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color, flexShrink: 0 }}>
                                    <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={m.d} /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textMuted, marginBottom: 4 }}>{m.label}</div>
                                    <div style={{ fontSize: typeof m.value === 'number' ? 30 : 18, fontWeight: 800, color: t.titleColor, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{m.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Card */}
                    <div style={{ background: t.card, border: `1px solid ${t.cardBorder}`, borderRadius: 20, overflow: 'hidden', transition: 'background 0.3s' }}>
                        {/* Toolbar */}
                        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.cardBorder}`, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', background: t.toolbar }}>
                            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                                <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: t.iconMuted }}>
                                    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input type="text" placeholder="Cari nama, email, pesan..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', background: t.input, border: `1px solid ${t.inputBorder}`, borderRadius: 10, padding: '9px 14px 9px 36px', fontSize: 13, color: t.text, outline: 'none', fontWeight: 500 }} />
                            </div>
                            <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} style={{ background: t.input, border: `1px solid ${t.inputBorder}`, borderRadius: 10, padding: '9px 14px', fontSize: 13, color: t.text, outline: 'none', cursor: 'pointer', fontWeight: 600 }}>
                                <option value="ALL">Semua Layanan</option>
                                {uniqueServices.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Table */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                <thead>
                                    <tr style={{ borderBottom: `1px solid ${t.cardBorder}` }}>
                                        {['Tanggal', 'Klien', 'Kontak', 'Layanan', 'Pesan', ''].map((h, i) => (
                                            <th key={i} style={{ padding: '12px 18px', textAlign: i === 5 ? 'right' : 'left', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textMuted, background: t.tableHead, whiteSpace: 'nowrap' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} style={{ padding: '60px 20px', textAlign: 'center', color: t.textMuted }}>
                                                <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                                                <div style={{ fontWeight: 700, fontSize: 15 }}>Belum ada leads</div>
                                            </td>
                                        </tr>
                                    ) : filteredLeads.map(lead => {
                                        const d = new Date(lead.created_at)
                                        const waNum = sanitizeWA(lead.phone)
                                        return (
                                            <tr key={lead.id} style={{ borderBottom: `1px solid ${t.tableDiv}`, transition: 'background 0.15s' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = t.tableRow)}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                                <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                                                    <div style={{ fontWeight: 600, color: t.textSoft }}>{d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                                    <div style={{ fontSize: 12, marginTop: 2, color: t.textMuted }}>{d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</div>
                                                </td>
                                                <td style={{ padding: '14px 18px' }}>
                                                    <div style={{ fontWeight: 700, color: t.titleColor }}>{lead.name}</div>
                                                    <a href={`mailto:${lead.email}`} style={{ color: '#818cf8', fontSize: 12, textDecoration: 'none', fontWeight: 600, marginTop: 2, display: 'block' }}>{lead.email}</a>
                                                </td>
                                                <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <span style={{ fontFamily: 'monospace', color: t.textSoft, fontSize: 13, background: t.phone.bg, padding: '2px 8px', borderRadius: 6 }}>{lead.phone || '—'}</span>
                                                        {waNum && (
                                                            <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 8, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', textDecoration: 'none' }}>
                                                                <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.768.815 2.79.815 3.182 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.77-5.769-5.77zm3.385 8.163c-.145.408-.847.781-1.177.83-.33.048-.756.071-2.316-.576-1.996-.826-3.266-2.849-3.366-2.982-.099-.133-.807-1.074-.807-2.048 0-.974.509-1.453.69-1.65.181-.198.396-.248.528-.248.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.561 1.37.611 1.47.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.115-.208.257-.297.345-.099.099-.202.207-.087.405.115.198.513.847 1.101 1.37.757.674 1.394.882 1.592.981.198.099.314.083.43-.05.115-.132.495-.578.627-.776.132-.198.264-.165.445-.099.181.066 1.155.545 1.353.644.198.099.33.149.379.231.05.083.05.479-.095.887z" /></svg>
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                                                    <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 20, background: t.badge.bg, border: `1px solid ${t.badge.border}`, color: t.badge.text, fontSize: 12, fontWeight: 700 }}>{lead.service_type || 'Umum'}</span>
                                                </td>
                                                <td style={{ padding: '14px 18px', maxWidth: 200 }}>
                                                    <p onClick={() => setSelectedLead(lead)} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: t.textMuted, cursor: 'pointer', fontSize: 13, margin: 0 }} title={lead.message}>{lead.message}</p>
                                                </td>
                                                <td style={{ padding: '14px 18px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                                    <button onClick={() => setSelectedLead(lead)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: t.detailBtn.bg, border: `1px solid ${t.detailBtn.border}`, borderRadius: 8, color: t.detailBtn.text, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                                                        Detail
                                                        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ padding: '12px 20px', borderTop: `1px solid ${t.cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: t.textMuted, background: t.toolbar }}>
                            <span>Menampilkan <strong style={{ color: t.textSoft }}>{filteredLeads.length}</strong> dari <strong style={{ color: t.textSoft }}>{initialLeads.length}</strong> leads</span>
                            <span>MyDEV © {new Date().getFullYear()}</span>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {selectedLead && (
                <div onClick={e => { if (e.target === e.currentTarget) setSelectedLead(null) }} style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: t.modal.overlay, backdropFilter: 'blur(8px)' }}>
                    <div style={{ background: t.modal.bg, border: `1px solid ${t.modal.border}`, borderRadius: 24, width: '100%', maxWidth: 520, overflow: 'hidden', boxShadow: '0 25px 80px rgba(0,0,0,0.3)' }}>
                        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${t.modal.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: isDark ? 'linear-gradient(135deg, rgba(99,102,241,0.1), transparent)' : 'linear-gradient(135deg, rgba(99,102,241,0.05), transparent)' }}>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6366f1', marginBottom: 4 }}>Detail Lead</div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: t.titleColor, margin: 0, letterSpacing: '-0.02em' }}>{selectedLead.name}</h3>
                            </div>
                            <button onClick={() => setSelectedLead(null)} style={{ width: 32, height: 32, borderRadius: 8, background: t.modal.field, border: `1px solid ${t.modal.border}`, color: t.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            {[
                                { label: 'Email', val: <a href={`mailto:${selectedLead.email}`} style={{ color: '#818cf8', fontWeight: 700, textDecoration: 'none', wordBreak: 'break-all', fontSize: 13 }}>{selectedLead.email}</a> },
                                { label: 'Telepon', val: <span style={{ fontFamily: 'monospace', color: t.text, fontWeight: 600, fontSize: 13 }}>{selectedLead.phone || '—'}</span> },
                                { label: 'Layanan', val: <span style={{ color: t.badge.text, fontWeight: 700, fontSize: 13 }}>{selectedLead.service_type || 'Umum'}</span> },
                                { label: 'Waktu', val: <span style={{ color: t.textSoft, fontWeight: 600, fontSize: 13 }}>{new Date(selectedLead.created_at).toLocaleString('id-ID')}</span> },
                            ].map((f, i) => (
                                <div key={i} style={{ background: t.modal.field, border: `1px solid ${t.modal.fieldBorder}`, borderRadius: 12, padding: '12px 14px' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textMuted, marginBottom: 6 }}>{f.label}</div>
                                    {f.val}
                                </div>
                            ))}
                        </div>
                        <div style={{ padding: '0 24px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.textMuted }}>Pesan Klien</span>
                                <button onClick={() => handleCopy(selectedLead.message, selectedLead.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 6, color: copiedId === selectedLead.id ? '#10b981' : '#818cf8', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                                    {copiedId === selectedLead.id ? '✓ Tersalin!' : '⧉ Salin'}
                                </button>
                            </div>
                            <div style={{ background: t.msgBg, border: `1px solid ${t.msgBorder}`, borderRadius: 12, padding: '14px 16px', color: t.textSoft, fontSize: 13, lineHeight: 1.7, maxHeight: 200, overflowY: 'auto', whiteSpace: 'pre-wrap' }}>{selectedLead.message}</div>
                        </div>
                        <div style={{ padding: '0 24px 24px', display: 'flex', gap: 10 }}>
                            {sanitizeWA(selectedLead.phone) && (
                                <a href={`https://wa.me/${sanitizeWA(selectedLead.phone)}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, color: '#10b981', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                                    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.768.815 2.79.815 3.182 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.77-5.769-5.77zm3.385 8.163c-.145.408-.847.781-1.177.83-.33.048-.756.071-2.316-.576-1.996-.826-3.266-2.849-3.366-2.982-.099-.133-.807-1.074-.807-2.048 0-.974.509-1.453.69-1.65.181-.198.396-.248.528-.248.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.561 1.37.611 1.47.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.115-.208.257-.297.345-.099.099-.202.207-.087.405.115.198.513.847 1.101 1.37.757.674 1.394.882 1.592.981.198.099.314.083.43-.05.115-.132.495-.578.627-.776.132-.198.264-.165.445-.099.181.066 1.155.545 1.353.644.198.099.33.149.379.231.05.083.05.479-.095.887z" /></svg>
                                    WhatsApp
                                </a>
                            )}
                            <a href={`mailto:${selectedLead.email}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', border: 'none', borderRadius: 12, color: '#ffffff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                                <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Kirim Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
