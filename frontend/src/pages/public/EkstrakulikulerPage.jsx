import { useQuery } from '@tanstack/react-query'
import { getEkstraList } from '@/api/services'
import { Users, Clock, MapPin } from 'lucide-react'

export default function EkstrakulikulerPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['ekskul'],
    queryFn: () => getEkstraList().then(r => r.data),
  })
  const list = Array.isArray(data) ? data : (data?.data ?? [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-purple-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Ekstrakulikuler</h1>
          <p className="text-purple-100 mt-2">Pengembangan bakat dan minat siswa</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-white rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group">
                <div className="h-44 bg-gradient-to-br from-purple-50 to-violet-100 overflow-hidden">
                  {item.foto_url
                    ? <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full flex items-center justify-center text-5xl">🎯</div>
                  }
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 font-heading text-lg">{item.nama}</h3>
                  {item.deskripsi && <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{item.deskripsi}</p>}
                  <div className="mt-3 space-y-1.5">
                    {item.pembina && (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Users size={11} className="text-purple-500" /> Pembina: {item.pembina}
                      </p>
                    )}
                    {item.jadwal && (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Clock size={11} className="text-purple-500" /> {item.jadwal}
                      </p>
                    )}
                    {item.tempat && (
                      <p className="text-xs text-gray-500 flex items-center gap-1.5">
                        <MapPin size={11} className="text-purple-500" /> {item.tempat}
                      </p>
                    )}
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
