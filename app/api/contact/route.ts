import { NextResponse } from 'next/server'
import { supabaseAdmin, supabaseClient } from '@/app/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, service_type, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Data tidak lengkap. Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      )
    }

    // Gunakan supabaseAdmin (service role) agar insert berhasil meski tabel leads menggunakan RLS
    const client = supabaseAdmin || supabaseClient

    const { error } = await client
      .from('leads')
      .insert([{ name, email, phone, service_type, message }])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('API contact error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 })
  }
}
