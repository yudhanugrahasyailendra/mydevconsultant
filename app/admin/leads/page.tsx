import { supabaseAdmin } from '@/app/lib/supabase'
import LogoutButton from '@/app/admin/components/logout-button'
import LeadsDashboardClient, { Lead } from './leads-client'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
    if (!supabaseAdmin) {
        return (
            <div className="min-h-screen bg-[#070D1E] flex flex-col items-center justify-center p-6 text-slate-100">
                <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D152D] border border-red-500/30 text-center space-y-4 shadow-2xl">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center mx-auto">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-white">Konfigurasi Belum Lengkap</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Variabel <code className="text-red-400 bg-red-950/50 px-1.5 py-0.5 rounded">SUPABASE_SERVICE_ROLE_KEY</code> belum tersedia di environment server. Pastikan variabel ini telah ditambahkan di Vercel Dashboard lalu lakukan redeploy.
                    </p>
                    <div className="pt-2">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        )
    }

    const { data: leads, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div className="min-h-screen bg-[#070D1E] flex flex-col items-center justify-center p-6 text-slate-100">
                <div className="max-w-md w-full p-8 rounded-2xl bg-[#0D152D] border border-red-500/30 text-center space-y-4 shadow-2xl">
                    <h2 className="text-xl font-bold text-white">Gagal Memuat Data</h2>
                    <p className="text-xs text-red-400">{error.message}</p>
                    <div className="pt-2">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        )
    }

    return <LeadsDashboardClient initialLeads={(leads as Lead[]) || []} />
}