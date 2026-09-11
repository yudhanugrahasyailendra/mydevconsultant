import { supabaseAdmin } from '@/app/lib/supabase'
import LogoutButton from '@/app/admin/components/logout-button'
import LeadsDashboardClient, { Lead } from './leads-client'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
    if (!supabaseAdmin) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
                <div className="max-w-md w-full p-8 rounded-xl bg-white border border-[#EAEAEA] text-center space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mx-auto">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">Missing Configuration</h2>
                    <p className="text-[13px] text-zinc-500 leading-relaxed">
                        The <code className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100 font-mono text-[12px]">SUPABASE_SERVICE_ROLE_KEY</code> is not available. Please add it to your Vercel project environment variables and redeploy.
                    </p>
                    <div className="pt-4 flex justify-center">
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
            <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-zinc-900 font-sans">
                <div className="max-w-md w-full p-8 rounded-xl bg-white border border-[#EAEAEA] text-center space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">Failed to load data</h2>
                    <p className="text-[13px] text-red-600">{error.message}</p>
                    <div className="pt-4 flex justify-center">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        )
    }

    return <LeadsDashboardClient initialLeads={(leads as Lead[]) || []} />
}