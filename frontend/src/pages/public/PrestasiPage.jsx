import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPrestasiList } from '@/api/services'
import { Trophy } from 'lucide-react'

const TINGKAT_COLOR = {
  internasional: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  nasional:      'bg-red-100 text-red-800 border-red-200',
  provinsi:      'bg-purple-100 text-purple-800 border-purple-200',
  kabupaten:     'bg-blue-100 text-blue-800 border-blue-200',
  kecamatan:     'bg-green-100 text-green-800 border-green-200',
  sekolah:       'bg-gray-100 text-gray-800 border-gray-200',
}

const TINGKAT_ICON = { internasional: '🌍', nasional: '🇮🇩', provinsi: '🏛️', kabupaten: '🏢', kecamatan: '🏘️', sekolah: '🏫' }

export default function PrestasiPage() {
  const [tingkat, setTingkat] = useState('semua')

  const { data, isLoading } = useQuery({
    queryKey: ['prestasi', tingkat],
    queryFn: () => getPrestasiList({
      tingkat: tingkat !== 'semua' ? tingkat : undefined, per_page: 24
    }).then(r => r.data),
  })
  const list = data?.data ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-yellow-600 to-amber-700 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-100 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Prestasi</h1>
          <p className="text-yellow-50 mt-2">Pencapaian membanggakan siswa & guru</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter tingkat */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['semua', 'internasional', 'nasional', 'provinsi', 'kabupaten', 'kecamatan', 'sekolah'].map(t => (
            <button key={t} onClick={() => setTingkat(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                tingkat === t ? 'bg-yellow-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-yellow-50 border border-gray-200'
              }`}>
              {TINGKAT_ICON[t] || '🏅'} {t}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-white rounded-2xl animate-pulse" />)}
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-24"><Trophy size={48} className="mx-auto text-gray-200 mb-4" /><p className="text-gray-400">Tidak ada prestasi untuk filter ini.</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 card-hover">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{TINGKAT_ICON[item.tingkat] || '🏅'}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 font-heading leading-snug line-clamp-2">{item.nama_prestasi}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${TINGKAT_COLOR[item.tingkat] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {item.tingkat}
                      </span>
                      {item.juara && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-800 border border-yellow-200">
                          {item.juara}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {item.tahun} {item.penyelenggara && `· ${item.penyelenggara}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
