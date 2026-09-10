'use client'

import { useState } from 'react'

interface FormStatus {
  type: 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<FormStatus | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          service_type: formData.get('service_type'),
          message: formData.get('message'),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan')
      }

      setStatus({
        type: 'success',
        message: 'Pesan Anda berhasil dikirim! Tim MyDEV akan segera menghubungi Anda.',
      })
      form.reset()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.'
      setStatus({
        type: 'error',
        message: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {status && (
        <div
          role="alert"
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            fontSize: '14px',
            lineHeight: 1.5,
            fontWeight: 500,
            background: status.type === 'success' ? '#ECFDF5' : '#FEF2F2',
            color: status.type === 'success' ? '#065F46' : '#991B1B',
            border: `1px solid ${status.type === 'success' ? '#A7F3D0' : '#FECACA'}`,
          }}
        >
          {status.type === 'success' ? '✓ ' : '✕ '}
          {status.message}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nama</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nama lengkap Anda"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">No. WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="08xx-xxxx-xxxx"
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nama@email.com"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="service_type">Jenis Proyek</label>
        <input
          id="service_type"
          name="service_type"
          type="text"
          placeholder="Landing page, company profile, toko online, dll."
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Pesan</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Ceritakan kebutuhan website Anda secara singkat..."
          required
          disabled={loading}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
        disabled={loading}
      >
        {loading ? 'Mengirim...' : 'Kirim Pesan →'}
      </button>
    </form>
  )
}
