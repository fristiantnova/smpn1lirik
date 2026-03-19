import { useQuery } from '@tanstack/react-query'
import { getFasilitasList } from '@/api/services'
import { Building2, CheckCircle } from 'lucide-react'

const KONDISI_COLOR = {
  baik:            'text-green-600 bg-green-50',
  cukup:           'text-yellow-600 bg-yellow-50',
  'rusak ringan':  'text-red-400 bg-red-50',
}

export default function FasilitasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['fasilitas'],
    queryFn: () => getFasilitasList().then(r => r.data),
  })
  const list = Array.isArray(data) ? data : (data?.data ?? [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-300 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Fasilitas</h1>
          <p className="text-slate-300 mt-2">Sarana dan prasarana pendukung pembelajaran</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-52 bg-white rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group">
                <div className="h-40 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                  {item.foto_url
                    ? <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full flex items-center justify-center"><Building2 size={36} className="text-slate-300" /></div>
                  }
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 font-heading leading-snug">{item.nama}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 capitalize ${KONDISI_COLOR[item.kondisi] || 'text-gray-600 bg-gray-50'}`}>
                      <CheckCircle size={10} className="inline mr-0.5" />{item.kondisi}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 capitalize">{item.kategori} · {item.jumlah} unit</p>
                  {item.deskripsi && <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.deskripsi}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
