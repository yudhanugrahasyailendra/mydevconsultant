'use client'

import { useState, useMemo } from 'react'
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

export default function LeadsDashboardClient({ initialLeads }: LeadsClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [serviceFilter, setServiceFilter] = useState('ALL')
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [copiedId, setCopiedId] = useState<string | number | null>(null)

    // Calculate unique services
    const uniqueServices = useMemo(() => {
        const set = new Set<string>()
        initialLeads.forEach((l) => {
            if (l.service_type) set.add(l.service_type)
        })
        return Array.from(set)
    }, [initialLeads])

    // Filter leads
    const filteredLeads = useMemo(() => {
        return initialLeads.filter((lead) => {
            const query = searchQuery.toLowerCase()
            const matchQuery =
                !query ||
                lead.name?.toLowerCase().includes(query) ||
                lead.email?.toLowerCase().includes(query) ||
                lead.phone?.toLowerCase().includes(query) ||
                lead.message?.toLowerCase().includes(query) ||
                lead.service_type?.toLowerCase().includes(query)

            const matchService =
                serviceFilter === 'ALL' || lead.service_type === serviceFilter

            return matchQuery && matchService
        })
    }, [initialLeads, searchQuery, serviceFilter])

    // KPI Metrics
    const metrics = useMemo(() => {
        const total = initialLeads.length
        const withPhone = initialLeads.filter((l) => l.phone && l.phone.trim().length > 4).length

        // Count most popular service
        const serviceCounts: Record<string, number> = {}
        initialLeads.forEach((l) => {
            const s = l.service_type || 'Umum'
            serviceCounts[s] = (serviceCounts[s] || 0) + 1
        })
        let topService = '-'
        let topCount = 0
        Object.entries(serviceCounts).forEach(([name, count]) => {
            if (count > topCount) {
                topCount = count
                topService = name
            }
        })

        return { total, withPhone, topService }
    }, [initialLeads])

    // Export CSV
    function exportToCSV() {
        if (!initialLeads.length) return
        const headers = ['ID', 'Tanggal', 'Nama', 'Email', 'Telepon', 'Layanan', 'Pesan', 'Status']
        const rows = initialLeads.map((l) => [
            l.id,
            `"${new Date(l.created_at).toLocaleString('id-ID')}"`,
            `"${(l.name || '').replace(/"/g, '""')}"`,
            `"${(l.email || '').replace(/"/g, '""')}"`,
            `"${(l.phone || '').replace(/"/g, '""')}"`,
            `"${(l.service_type || '').replace(/"/g, '""')}"`,
            `"${(l.message || '').replace(/"/g, '""')}"`,
            `"${(l.status || 'Baru').replace(/"/g, '""')}"`,
        ])
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `leads_mydev_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Format WA phone
    function sanitizeWA(phone?: string | null) {
        if (!phone) return null
        let clean = phone.replace(/[^0-9]/g, '')
        if (clean.startsWith('0')) clean = '62' + clean.slice(1)
        return clean
    }

    // Copy message helper
    function handleCopy(text: string, id: string | number) {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="min-h-screen bg-[#070D1E] text-slate-100 selection:bg-sky-500 selection:text-white">
            {/* Top Navigation */}
            <header className="sticky top-0 z-30 bg-[#0A1128]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image
                                src="/images/logo/MyDEV.png"
                                alt="MyDEV Logo"
                                width={130}
                                height={36}
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <div className="h-5 w-px bg-slate-700/60 hidden sm:block" />
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold">
                            Admin Dashboard
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            target="_blank"
                            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl border border-slate-700/50 transition-colors"
                        >
                            <span>Lihat Website</span>
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Greeting & Headline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            Manajemen Leads Masuk
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Daftar calon klien dan konsultasi yang masuk melalui formulir kontak MyDEV.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                        <button
                            onClick={exportToCSV}
                            disabled={!initialLeads.length}
                            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Ekspor CSV</span>
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Total */}
                    <div className="p-5 rounded-2xl bg-[#0D152D]/80 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</span>
                            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-white">{metrics.total}</span>
                            <span className="text-xs text-slate-400">prospek tersimpan</span>
                        </div>
                    </div>

                    {/* Card 2: Phone / WA */}
                    <div className="p-5 rounded-2xl bg-[#0D152D]/80 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kontak WA / Telepon</span>
                            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold text-white">{metrics.withPhone}</span>
                            <span className="text-xs text-emerald-400">dapat langsung di-chat</span>
                        </div>
                    </div>

                    {/* Card 3: Top Service */}
                    <div className="p-5 rounded-2xl bg-[#0D152D]/80 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Layanan Terpopuler</span>
                            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </span>
                        </div>
                        <div className="mt-3 flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white truncate">{metrics.topService}</span>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="p-4 rounded-2xl bg-[#0D152D]/80 border border-slate-800/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Cari nama, email, pesan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#080D1F] border border-slate-700/80 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-white placeholder-slate-500 text-xs rounded-xl pl-10 pr-8 py-2.5 outline-none transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Service Filter */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <label className="text-xs text-slate-400 whitespace-nowrap">Filter Layanan:</label>
                        <select
                            value={serviceFilter}
                            onChange={(e) => setServiceFilter(e.target.value)}
                            className="bg-[#080D1F] border border-slate-700/80 focus:border-sky-500 text-white text-xs rounded-xl px-3 py-2 outline-none transition-all cursor-pointer"
                        >
                            <option value="ALL">Semua Layanan</option>
                            {uniqueServices.map((svc) => (
                                <option key={svc} value={svc}>
                                    {svc}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-[#0D152D]/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-[#0A1024] text-slate-400 font-semibold uppercase tracking-wider">
                                    <th className="py-3.5 px-4">Tanggal</th>
                                    <th className="py-3.5 px-4">Nama & Email</th>
                                    <th className="py-3.5 px-4">Kontak</th>
                                    <th className="py-3.5 px-4">Layanan</th>
                                    <th className="py-3.5 px-4">Pesan Klien</th>
                                    <th className="py-3.5 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <div className="p-3 bg-slate-800/50 rounded-2xl text-slate-500">
                                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                </div>
                                                <p className="text-sm font-medium text-slate-300">Belum ada leads ditemukan</p>
                                                <p className="text-xs text-slate-500">
                                                    {searchQuery ? 'Coba ubah kata kunci pencarian Anda.' : 'Pesan dari calon klien akan otomatis muncul di sini.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => {
                                        const waNumber = sanitizeWA(lead.phone)
                                        const createdDate = new Date(lead.created_at)
                                        const formattedDate = createdDate.toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })
                                        const formattedTime = createdDate.toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })

                                        return (
                                            <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                                                {/* Tanggal */}
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <div className="text-slate-200 font-medium">{formattedDate}</div>
                                                    <div className="text-slate-500 text-[11px]">{formattedTime} WIB</div>
                                                </td>

                                                {/* Nama & Email */}
                                                <td className="py-4 px-4">
                                                    <div className="font-semibold text-white text-sm">{lead.name}</div>
                                                    <a
                                                        href={`mailto:${lead.email}`}
                                                        className="text-sky-400 hover:text-sky-300 transition-colors text-[11px] inline-flex items-center gap-1 mt-0.5"
                                                    >
                                                        <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>{lead.email}</span>
                                                    </a>
                                                </td>

                                                {/* Kontak */}
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {lead.phone ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-slate-300 font-mono">{lead.phone}</span>
                                                            {waNumber && (
                                                                <a
                                                                    href={`https://wa.me/${waNumber}?text=Halo%20${encodeURIComponent(lead.name)},%20kami%20dari%20MyDEV%20IT%20Consultant.`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="p-1 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all"
                                                                    title="Chat via WhatsApp"
                                                                >
                                                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                                                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.768.815 2.79.815 3.182 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.77-5.769-5.77zm3.385 8.163c-.145.408-.847.781-1.177.83-.33.048-.756.071-2.316-.576-1.996-.826-3.266-2.849-3.366-2.982-.099-.133-.807-1.074-.807-2.048 0-.974.509-1.453.69-1.65.181-.198.396-.248.528-.248.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.561 1.37.611 1.47.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.115-.208.257-.297.345-.099.099-.202.207-.087.405.115.198.513.847 1.101 1.37.757.674 1.394.882 1.592.981.198.099.314.083.43-.05.115-.132.495-.578.627-.776.132-.198.264-.165.445-.099.181.066 1.155.545 1.353.644.198.099.33.149.379.231.05.083.05.479-.095.887z" />
                                                                    </svg>
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-500 italic">-</span>
                                                    )}
                                                </td>

                                                {/* Layanan */}
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20">
                                                        {lead.service_type || 'Umum'}
                                                    </span>
                                                </td>

                                                {/* Pesan (truncated) */}
                                                <td className="py-4 px-4 max-w-xs">
                                                    <p
                                                        onClick={() => setSelectedLead(lead)}
                                                        className="text-slate-300 truncate hover:text-white cursor-pointer transition-colors"
                                                        title="Klik untuk membaca pesan lengkap"
                                                    >
                                                        {lead.message}
                                                    </p>
                                                </td>

                                                {/* Aksi */}
                                                <td className="py-4 px-4 text-right whitespace-nowrap">
                                                    <button
                                                        onClick={() => setSelectedLead(lead)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                                                    >
                                                        <span>Detail</span>
                                                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="p-3 bg-[#0A1024] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Menampilkan {filteredLeads.length} dari total {initialLeads.length} leads</span>
                        <span className="text-slate-500">MyDEV Consulting &copy; {new Date().getFullYear()}</span>
                    </div>
                </div>
            </main>

            {/* Modal Detail Pesan */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="bg-[#0E1630] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <div>
                                <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Detail Lead</span>
                                <h3 className="text-lg font-bold text-white mt-0.5">{selectedLead.name}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-[#090E20] border border-slate-800">
                                <span className="text-slate-500 block mb-1">Email</span>
                                <a href={`mailto:${selectedLead.email}`} className="text-sky-400 font-medium hover:underline break-all">
                                    {selectedLead.email}
                                </a>
                            </div>

                            <div className="p-3 rounded-xl bg-[#090E20] border border-slate-800">
                                <span className="text-slate-500 block mb-1">Telepon / WhatsApp</span>
                                <span className="text-white font-medium">
                                    {selectedLead.phone || '-'}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#090E20] border border-slate-800">
                                <span className="text-slate-500 block mb-1">Layanan</span>
                                <span className="text-white font-medium">
                                    {selectedLead.service_type || 'Umum'}
                                </span>
                            </div>

                            <div className="p-3 rounded-xl bg-[#090E20] border border-slate-800">
                                <span className="text-slate-500 block mb-1">Waktu Kirim</span>
                                <span className="text-white font-medium">
                                    {new Date(selectedLead.created_at).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* Pesan Box */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-semibold text-slate-400">Pesan dari Klien:</label>
                                <button
                                    onClick={() => handleCopy(selectedLead.message, selectedLead.id)}
                                    className="text-[11px] text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                                >
                                    {copiedId === selectedLead.id ? (
                                        <>
                                            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-emerald-400">Tersalin!</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span>Salin Pesan</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="p-3.5 bg-[#080C1B] rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                                {selectedLead.message}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                            {sanitizeWA(selectedLead.phone) && (
                                <a
                                    href={`https://wa.me/${sanitizeWA(selectedLead.phone)}?text=Halo%20${encodeURIComponent(selectedLead.name)},%20terima%20kasih%20telah%20menghubungi%20MyDEV%20IT%20Consultant.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.768.815 2.79.815 3.182 0 5.77-2.587 5.77-5.767 0-3.181-2.587-5.77-5.769-5.77zm3.385 8.163c-.145.408-.847.781-1.177.83-.33.048-.756.071-2.316-.576-1.996-.826-3.266-2.849-3.366-2.982-.099-.133-.807-1.074-.807-2.048 0-.974.509-1.453.69-1.65.181-.198.396-.248.528-.248.132 0 .264.002.379.008.121.006.284-.046.444.339.165.396.561 1.37.611 1.47.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.115-.208.257-.297.345-.099.099-.202.207-.087.405.115.198.513.847 1.101 1.37.757.674 1.394.882 1.592.981.198.099.314.083.43-.05.115-.132.495-.578.627-.776.132-.198.264-.165.445-.099.181.066 1.155.545 1.353.644.198.099.33.149.379.231.05.083.05.479-.095.887z" />
                                    </svg>
                                    <span>Hubungi via WA</span>
                                </a>
                            )}
                            <a
                                href={`mailto:${selectedLead.email}?subject=Follow%20up%20Konsultasi%20MyDEV`}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Kirim Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
