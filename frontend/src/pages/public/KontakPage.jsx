import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { sendKontak } from '@/api/services'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  nama:    z.string().min(2, 'Nama minimal 2 karakter'),
  email:   z.string().email('Format email tidak valid'),
  telepon: z.string().optional(),
  subjek:  z.string().optional(),
  pesan:   z.string().min(10, 'Pesan minimal 10 karakter'),
})

export default function KontakPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data) => sendKontak(data),
    onSuccess: () => { setSent(true); reset() },
    onError:   () => toast.error('Gagal mengirim pesan. Coba lagi.'),
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Hubungi Kami</h1>
          <p className="text-blue-100 mt-2">Kami siap membantu pertanyaan Anda</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Info kontak */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, label: 'Alamat', value: 'Jl. Pelajar No. 1, Lirik, Indragiri Hulu, Riau 29352', color: 'text-blue-600 bg-blue-50' },
              { icon: Phone, label: 'Telepon', value: '(0769) 123456', color: 'text-green-600 bg-green-50' },
              { icon: Mail, label: 'Email', value: 'info@smpn2lirik.sch.id', color: 'text-purple-600 bg-purple-50' },
              { icon: Clock, label: 'Jam Layanan', value: 'Senin – Jumat: 07.00 – 15.00 WIB', color: 'text-orange-600 bg-orange-50' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start gap-4 card-hover">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                  <p className="text-gray-800 font-medium mt-0.5 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-bold font-heading text-gray-900">Pesan Terkirim!</h3>
                  <p className="text-gray-500 mt-2">Terima kasih. Kami akan segera menghubungi Anda.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-sm text-blue-600 hover:underline">
                    Kirim pesan lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-5">
                  <h2 className="text-xl font-bold font-heading text-gray-900">Kirim Pesan</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                      <input {...register('nama')} placeholder="Nama Anda"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.nama && <p className="text-xs text-red-500 mt-1">{errors.nama.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                      <input {...register('email')} type="email" placeholder="email@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Telepon</label>
                      <input {...register('telepon')} placeholder="08xx-xxxx-xxxx"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subjek</label>
                      <input {...register('subjek')} placeholder="Perihal pesan..."
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pesan *</label>
                    <textarea {...register('pesan')} rows={5} placeholder="Tuliskan pesan Anda..."
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                    {errors.pesan && <p className="text-xs text-red-500 mt-1">{errors.pesan.message}</p>}
                  </div>
                  <button type="submit" disabled={mutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {mutation.isPending ? 'Mengirim...' : 'Kirim Pesan →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
