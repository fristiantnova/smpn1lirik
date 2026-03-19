import { useQuery } from '@tanstack/react-query'
import { getAgendaList } from '@/api/services'
import { Calendar, MapPin, Clock, Tag } from 'lucide-react'

const formatTanggal = (str) => str
  ? new Date(str).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : ''

const KATEGORI_COLOR = {
  akademik:    'bg-blue-100 text-blue-700',
  olahraga:    'bg-green-100 text-green-700',
  seni:        'bg-purple-100 text-purple-700',
  keagamaan:   'bg-yellow-100 text-yellow-700',
  umum:        'bg-gray-100 text-gray-700',
}

export default function AgendaPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['agenda'],
    queryFn: () => getAgendaList({ per_page: 20 }).then(r => r.data),
  })
  const list = data?.data ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-700 to-emerald-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-green-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Agenda Sekolah</h1>
          <p className="text-green-100 mt-2">Jadwal kegiatan mendatang</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-4">
        {isLoading
          ? [...Array(5)].map((_, i) => <div key={i} className="h-28 bg-white rounded-2xl animate-pulse" />)
          : list.length === 0
            ? <div className="text-center py-24"><Calendar size={48} className="mx-auto text-gray-200 mb-4" /><p className="text-gray-400">Tidak ada agenda mendatang.</p></div>
            : list.map(item => {
              const tgl = new Date(item.tanggal_mulai)
              return (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 card-hover flex items-start gap-5">
                  {/* Tanggal Box */}
                  <div className="w-14 h-14 bg-green-600 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 text-white">
                    <span className="text-xl font-bold leading-none">{tgl.getDate()}</span>
                    <span className="text-xs">{tgl.toLocaleDateString('id-ID', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-gray-900 font-heading">{item.judul}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${KATEGORI_COLOR[item.kategori] || 'bg-gray-100 text-gray-700'}`}>
                        {item.kategori}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={11} />
                        {formatTanggal(item.tanggal_mulai)}
                        {item.tanggal_selesai && ` – ${formatTanggal(item.tanggal_selesai)}`}
                        {item.waktu && ` | ${item.waktu}`}
                      </span>
                      {item.lokasi && <span className="flex items-center gap-1"><MapPin size={11} />{item.lokasi}</span>}
                    </div>
                    {item.deskripsi && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.deskripsi}</p>}
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}
