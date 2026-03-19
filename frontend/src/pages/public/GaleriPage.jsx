import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGaleriList } from '@/api/services'
import { Image, Play, X } from 'lucide-react'

export default function GaleriPage() {
  const [tipe, setTipe]       = useState('semua')
  const [preview, setPreview] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['galeri', tipe],
    queryFn: () => getGaleriList({
      tipe: tipe !== 'semua' ? tipe : undefined, per_page: 24
    }).then(r => r.data),
  })
  const list = data?.data ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-teal-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Galeri</h1>
          <p className="text-teal-100 mt-2">Dokumentasi kegiatan dan momen berharga sekolah</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {['semua', 'foto', 'video'].map(t => (
            <button key={t} onClick={() => setTipe(t)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                tipe === t ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
              }`}>
              {t === 'foto' ? '📷' : t === 'video' ? '🎬' : '🖼️'} {t}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-white rounded-xl animate-pulse" />)}
          </div>
        ) : list.length === 0 ? (
          <div className="text-center py-24"><Image size={48} className="mx-auto text-gray-200 mb-4" /><p className="text-gray-400">Belum ada item galeri.</p></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {list.map(item => (
              <button key={item.id} onClick={() => setPreview(item)}
                className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                {item.tipe === 'foto' && item.file_url ? (
                  <img src={item.file_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
                    <Play size={32} className="text-teal-400 mb-1" />
                    <span className="text-xs text-teal-600 font-medium">Video</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium px-2 text-center line-clamp-2 transition-opacity">
                    {item.judul}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {preview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <button onClick={() => setPreview(null)} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <X size={28} />
          </button>
          <div onClick={e => e.stopPropagation()} className="max-w-4xl w-full">
            {preview.tipe === 'foto' && preview.file_url ? (
              <img src={preview.file_url} alt={preview.judul} className="w-full max-h-[80vh] object-contain rounded-xl" />
            ) : (
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center">
                <p className="text-white text-sm">Video preview tidak tersedia</p>
              </div>
            )}
            <p className="text-white text-center mt-4 font-medium">{preview.judul}</p>
            {preview.deskripsi && <p className="text-gray-300 text-center text-sm mt-1">{preview.deskripsi}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
