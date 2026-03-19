import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitPpdb } from '@/api/services'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Upload, ClipboardList } from 'lucide-react'
import toast from 'react-hot-toast'

const schema = z.object({
  nama_lengkap:   z.string().min(3, 'Nama minimal 3 karakter'),
  jenis_kelamin:  z.enum(['L', 'P'], { required_error: 'Jenis kelamin wajib dipilih' }),
  tanggal_lahir:  z.string().min(1, 'Tanggal lahir wajib diisi'),
  alamat:         z.string().min(10, 'Alamat minimal 10 karakter'),
  asal_sekolah:   z.string().min(3, 'Nama sekolah asal wajib diisi'),
  telepon_ortu:   z.string().min(10, 'Nomor telepon minimal 10 digit'),
  tahun_ajaran:   z.string().min(1, 'Tahun ajaran wajib diisi'),
  nama_ayah:      z.string().optional(),
  nama_ibu:       z.string().optional(),
  email_ortu:     z.string().email('Format email tidak valid').optional().or(z.literal('')),
})

const InputField = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
)

const inputClass = "w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"

export default function PpdbPage() {
  const [successData, setSuccessData] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const mutation = useMutation({
    mutationFn: (data) => {
      const fd = new FormData()
      Object.entries(data).forEach(([k, v]) => { if (v) fd.append(k, v) })
      return submitPpdb(fd)
    },
    onSuccess: (res) => setSuccessData(res.data),
    onError: () => toast.error('Gagal mengirim pendaftaran. Periksa kembali data Anda.'),
  })

  if (successData) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold font-heading text-gray-900">Pendaftaran Berhasil!</h2>
        <p className="text-gray-500 mt-2">{successData.message}</p>
        <div className="mt-6 bg-blue-50 rounded-xl p-4">
          <p className="text-xs text-blue-600 font-medium">Nomor Pendaftaran Anda</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">{successData.nomor_daftar}</p>
          <p className="text-xs text-blue-600 mt-2">Simpan nomor ini untuk keperluan verifikasi</p>
        </div>
        <p className="text-sm text-gray-500 mt-4">Pihak sekolah akan menghubungi Anda melalui nomor telepon yang didaftarkan.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Pendaftaran PPDB Online</h1>
          <p className="text-blue-100 mt-2">Penerimaan Peserta Didik Baru Tahun Ajaran 2025/2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-6">

          {/* Data Diri Calon Siswa */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-5 flex items-center gap-2">
              <ClipboardList size={20} className="text-blue-600" /> Data Calon Siswa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <InputField label="Nama Lengkap" required error={errors.nama_lengkap?.message}>
                  <input {...register('nama_lengkap')} placeholder="Nama sesuai akta kelahiran" className={inputClass} />
                </InputField>
              </div>
              <InputField label="Jenis Kelamin" required error={errors.jenis_kelamin?.message}>
                <select {...register('jenis_kelamin')} className={inputClass}>
                  <option value="">Pilih...</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </InputField>
              <InputField label="NISN" error={errors.nisn?.message}>
                <input {...register('nisn')} placeholder="Nomor Induk Siswa Nasional" className={inputClass} />
              </InputField>
              <InputField label="Tempat Lahir" error={errors.tempat_lahir?.message}>
                <input {...register('tempat_lahir')} placeholder="Kota kelahiran" className={inputClass} />
              </InputField>
              <InputField label="Tanggal Lahir" required error={errors.tanggal_lahir?.message}>
                <input {...register('tanggal_lahir')} type="date" className={inputClass} />
              </InputField>
              <div className="sm:col-span-2">
                <InputField label="Alamat Lengkap" required error={errors.alamat?.message}>
                  <textarea {...register('alamat')} rows={3} placeholder="Alamat tempat tinggal saat ini" className={`${inputClass} resize-none`} />
                </InputField>
              </div>
              <InputField label="Asal Sekolah (SD/MI)" required error={errors.asal_sekolah?.message}>
                <input {...register('asal_sekolah')} placeholder="Nama SD/MI asal" className={inputClass} />
              </InputField>
              <InputField label="Tahun Lulus SD" error={errors.tahun_lulus?.message}>
                <input {...register('tahun_lulus')} placeholder="2024" className={inputClass} />
              </InputField>
            </div>
          </div>

          {/* Data Orang Tua */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-5">👨‍👩‍👧 Data Orang Tua</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Nama Ayah" error={errors.nama_ayah?.message}>
                <input {...register('nama_ayah')} placeholder="Nama lengkap ayah" className={inputClass} />
              </InputField>
              <InputField label="Nama Ibu" error={errors.nama_ibu?.message}>
                <input {...register('nama_ibu')} placeholder="Nama lengkap ibu" className={inputClass} />
              </InputField>
              <InputField label="Telepon Orang Tua" required error={errors.telepon_ortu?.message}>
                <input {...register('telepon_ortu')} placeholder="08xx-xxxx-xxxx" className={inputClass} />
              </InputField>
              <InputField label="Email Orang Tua" error={errors.email_ortu?.message}>
                <input {...register('email_ortu')} type="email" placeholder="email@example.com" className={inputClass} />
              </InputField>
            </div>
          </div>

          {/* Tahun Ajaran */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-5">📅 Informasi Pendaftaran</h2>
            <InputField label="Tahun Ajaran" required error={errors.tahun_ajaran?.message}>
              <select {...register('tahun_ajaran')} className={`${inputClass} max-w-xs`}>
                <option value="2025/2026">2025/2026</option>
                <option value="2026/2027">2026/2027</option>
              </select>
            </InputField>
          </div>

          <button type="submit" disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]">
            {mutation.isPending ? '⏳ Memproses Pendaftaran...' : '✅ Kirim Pendaftaran'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Dengan mengirim formulir ini, Anda menyetujui syarat dan ketentuan yang berlaku.
          </p>
        </form>
      </div>
    </div>
  )
}
