import { supabaseAdmin } from '@/app/lib/supabase'
import LogoutButton from '@/app/admin/components/logout-button'

export default async function LeadsPage() {
    if (!supabaseAdmin) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Daftar Leads</h1>
                    <LogoutButton />
                </div>
                <p className="text-red-500">
                    Konfigurasi <code>SUPABASE_SERVICE_ROLE_KEY</code> belum tersedia di Vercel Environment Variables.
                </p>
            </div>
        )
    }

    const { data: leads, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return <p className="p-8 text-red-500">Gagal memuat data: {error.message}</p>
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Daftar Leads ({leads?.length ?? 0})</h1>
                <LogoutButton />
            </div>
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b text-left">
                        <th className="p-2">Tanggal</th>
                        <th className="p-2">Nama</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Telepon</th>
                        <th className="p-2">Layanan</th>
                        <th className="p-2">Pesan</th>
                        <th className="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leads?.map((lead) => (
                        <tr key={lead.id} className="border-b">
                            <td className="p-2">{new Date(lead.created_at).toLocaleDateString('id-ID')}</td>
                            <td className="p-2">{lead.name}</td>
                            <td className="p-2">{lead.email}</td>
                            <td className="p-2">{lead.phone || '-'}</td>
                            <td className="p-2">{lead.service_type || '-'}</td>
                            <td className="p-2 max-w-xs truncate">{lead.message}</td>
                            <td className="p-2">{lead.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}