import { useQuery } from '@tanstack/react-query'
import { getProfilSekolah } from '@/api/services'
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, CheckCircle } from 'lucide-react'

export default function ProfilPage() {
  const { data: profil, isLoading } = useQuery({
    queryKey: ['profil'],
    queryFn: () => getProfilSekolah().then(r => r.data),
  })

  if (isLoading) return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-2xl" />)}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-indigo-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Profil Sekolah</h1>
          <p className="text-indigo-100 mt-2">Mengenal lebih dekat SMP Negeri 2 Lirik</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">

        {/* Info Umum */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {profil?.logo_url && (
              <img src={profil.logo_url} alt="Logo" className="w-24 h-24 object-contain rounded-xl border" />
            )}
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900">{profil?.nama_sekolah || 'SMP Negeri 2 Lirik'}</h2>
              <div className="flex flex-wrap gap-3 mt-3">
                {profil?.npsn && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                    NPSN: {profil.npsn}
                  </span>
                )}
                {profil?.akreditasi && (
                  <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                    Akreditasi: {profil.akreditasi}
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                {profil?.alamat && (
                  <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 text-blue-500 flex-shrink-0" /> {profil.alamat}, {profil.kecamatan}, {profil.kabupaten}, {profil.provinsi} {profil.kode_pos}</p>
                )}
                {profil?.telepon && <p className="flex items-center gap-2"><Phone size={14} className="text-blue-500" /> {profil.telepon}</p>}
                {profil?.email   && <p className="flex items-center gap-2"><Mail size={14} className="text-blue-500" /> {profil.email}</p>}
                {profil?.website && <p className="flex items-center gap-2"><Globe size={14} className="text-blue-500" /> {profil.website}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Visi */}
        {profil?.visi && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h2 className="text-xl font-bold font-heading text-blue-900 mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-blue-600" /> Visi
            </h2>
            <p className="text-blue-800 text-lg leading-relaxed italic">"{profil.visi}"</p>
          </div>
        )}

        {/* Misi */}
        {profil?.misi && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">Misi</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{profil.misi}</div>
          </div>
        )}

        {/* Sejarah */}
        {profil?.sejarah && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">Sejarah Singkat</h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{profil.sejarah}</div>
          </div>
        )}

        {/* Kepala Sekolah */}
        {profil?.kepala_sekolah && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">Kepala Sekolah</h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl flex-shrink-0">👤</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{profil.kepala_sekolah}</h3>
                {profil.nip_kepala_sekolah && <p className="text-sm text-gray-500 mt-0.5">NIP. {profil.nip_kepala_sekolah}</p>}
                {profil.sambutan_kepala_sekolah && (
                  <p className="mt-4 text-gray-600 leading-relaxed">{profil.sambutan_kepala_sekolah}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sosial Media */}
        {(profil?.facebook || profil?.instagram || profil?.youtube) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Media Sosial</h2>
            <div className="flex gap-4">
              {profil.facebook  && <a href={profil.facebook}  target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline"><Facebook size={16} /> Facebook</a>}
              {profil.instagram && <a href={profil.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-pink-600 hover:underline"><Instagram size={16} /> Instagram</a>}
              {profil.youtube   && <a href={profil.youtube}   target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-red-600 hover:underline"><Youtube size={16} /> YouTube</a>}
            </div>
          </div>
        )}

        {/* Maps */}
        {profil?.maps_embed && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <iframe src={profil.maps_embed} title="Lokasi Sekolah" className="w-full h-80" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        )}
      </div>
    </div>
  )
}
