import { useQuery } from '@tanstack/react-query'
import { getPengumumanList } from '@/api/services'
import { Megaphone, Download, Calendar, FileText } from 'lucide-react'

const formatTanggal = (str) => str
  ? new Date(str).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : ''

export default function PengumumanPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['pengumuman'],
    queryFn: () => getPengumumanList({ per_page: 20 }).then(r => r.data),
  })
  const list = data?.data ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-100 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Pengumuman</h1>
          <p className="text-orange-50 mt-2">Informasi resmi dari sekolah</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-4">
        {isLoading
          ? [...Array(5)].map((_, i) => <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />)
          : list.length === 0
            ? <div className="text-center py-24"><Megaphone size={48} className="mx-auto text-gray-200 mb-4" /><p className="text-gray-400">Tidak ada pengumuman aktif.</p></div>
            : list.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Megaphone size={18} className="text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 font-heading">{item.judul}</h3>
                    <p className="text-sm text-gray-500 mt-1.5 whitespace-pre-line line-clamp-3">{item.konten}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={11} /> {formatTanggal(item.created_at)}
                      </span>
                      {item.tanggal_kadaluarsa && (
                        <span className="text-xs text-gray-400">Berlaku s/d {formatTanggal(item.tanggal_kadaluarsa)}</span>
                      )}
                    </div>
                  </div>
                  {item.file_url && (
                    <a href={item.file_url} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-xl flex-shrink-0 transition-colors">
                      <Download size={14} /> Unduh
                    </a>
                  )}
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}
