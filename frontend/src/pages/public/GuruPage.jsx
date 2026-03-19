import { useQuery } from '@tanstack/react-query'
import { getGuruList } from '@/api/services'
import { User, BookOpen, Award, Search } from 'lucide-react'
import { useState } from 'react'

export default function GuruPage() {
  const [search, setSearch] = useState('')
  const [q, setQ]           = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['guru', q],
    queryFn: () => getGuruList({ search: q || undefined, per_page: 50 }).then(r => r.data),
  })

  const guruList = data?.data ?? []

  const handleSearch = (e) => { e.preventDefault(); setQ(search) }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-teal-800 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-green-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Guru & Tenaga Kependidikan</h1>
          <p className="text-green-100 mt-2">Tenaga pendidik profesional dan berpengalaman</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-md">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama, jabatan, mata pelajaran..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" className="px-4 py-2.5 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition-colors">
            Cari
          </button>
        </form>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse space-y-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : guruList.length === 0 ? (
          <div className="text-center py-24">
            <User size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">Tidak ada data guru{q ? ` untuk "${q}"` : ''}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {guruList.map(guru => (
              <div key={guru.id} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 card-hover group">
                {/* Foto */}
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-green-100 to-teal-100 ring-4 ring-green-50 group-hover:ring-green-100 transition-all">
                  {guru.foto_url
                    ? <img src={guru.foto_url} alt={guru.nama} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><User size={28} className="text-green-400" /></div>
                  }
                </div>

                {/* Info */}
                <h3 className="font-bold text-gray-900 font-heading leading-snug line-clamp-2 text-sm">
                  {guru.nama}
                </h3>

                {guru.jabatan && (
                  <span className="inline-block mt-2 text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                    {guru.jabatan}
                  </span>
                )}

                {guru.mata_pelajaran && (
                  <p className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
                    <BookOpen size={11} /> {guru.mata_pelajaran}
                  </p>
                )}

                {guru.pendidikan_terakhir && (
                  <p className="mt-1 text-xs text-gray-400 flex items-center justify-center gap-1">
                    <Award size={11} /> {guru.pendidikan_terakhir} · {guru.status_kepegawaian}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
