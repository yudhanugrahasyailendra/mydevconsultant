import { NextResponse } from 'next/server'
import { supabaseAdmin, supabaseClient } from '@/app/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Gunakan supabaseAdmin jika ada, agar bypass RLS Supabase
    const client = supabaseAdmin || supabaseClient

    const { data, error } = await client
      .from('leads')
      .insert([{ name, email, phone, service_type, message }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Kirim notifikasi email via Resend jika API key tersedia
    const apiKey = process.env.RESEND_API_KEY
    const notifyTo = process.env.NOTIFY_EMAIL || 'mydev9883@gmail.com'

    if (apiKey) {
      try {
        await resend.emails.send({
          // Menggunakan domain sandbox default Resend (ganti jika domain custom sudah diverifikasi di dashboard Resend)
          from: 'MyDEV Leads <onboarding@resend.dev>',
          to: notifyTo,
          subject: `Lead Baru: ${name} (${service_type || 'Umum'})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937; line-height: 1.6;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Lead Baru Masuk
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 140px;">Nama:</td>
                  <td style="padding: 6px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">No. Telepon / WA:</td>
                  <td style="padding: 6px 0;">${phone || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Layanan:</td>
                  <td style="padding: 6px 0;">${service_type || '-'}</td>
                </tr>
              </table>

              <div style="margin-top: 16px;">
                <p style="font-weight: bold; margin-bottom: 4px;">Pesan:</p>
                <div style="background-color: #f3f4f6; border-left: 4px solid #2563eb; padding: 12px; border-radius: 4px; white-space: pre-wrap;">${message}</div>
              </div>

              <hr style="margin-top: 24px; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="margin-top: 16px;">
                <a href="https://mydevitconsultant.com/admin/leads" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                  Lihat di Dashboard Admin &rarr;
                </a>
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        // Jangan gagalkan respons jika data sudah tersimpan di database
        console.error('Gagal kirim email notifikasi:', emailError)
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('API route error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 })
  }
}
