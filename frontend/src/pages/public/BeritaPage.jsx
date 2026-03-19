import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBeritaList } from '@/api/services'
import { Calendar, Search, Newspaper, ChevronLeft, ChevronRight } from 'lucide-react'

const KATEGORIS = ['semua', 'umum', 'kegiatan', 'prestasi', 'pengumuman']

const formatTanggal = (str) => str
  ? new Date(str).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : ''

export default function BeritaPage() {
  const [page, setPage]         = useState(1)
  const [search, setSearch]     = useState('')
  const [kategori, setKategori] = useState('semua')
  const [q, setQ]               = useState('')          // committed query

  const { data, isLoading } = useQuery({
    queryKey: ['berita', page, q, kategori],
    queryFn: () => getBeritaList({
      page, per_page: 9, search: q || undefined,
      kategori: kategori !== 'semua' ? kategori : undefined,
    }).then(r => r.data),
    placeholderData: prev => prev,
  })

  const beritaList = data?.data ?? []
  const lastPage   = data?.last_page ?? 1

  const handleSearch = (e) => { e.preventDefault(); setQ(search); setPage(1) }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-sm mb-2">SMPN 2 Lirik</p>
          <h1 className="text-4xl font-bold font-heading">Berita Sekolah</h1>
          <p className="text-blue-100 mt-2">Informasi terkini seputar kegiatan dan prestasi sekolah</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Kategori tabs */}
          <div className="flex gap-2 flex-wrap">
            {KATEGORIS.map(k => (
              <button key={k} onClick={() => { setKategori(k); setPage(1) }}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  kategori === k
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}>
                {k}
              </button>
            ))}
          </div>
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 ml-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Cari berita..."
                className="w-56 pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors">
              Cari
            </button>
          </form>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-5 bg-gray-200 rounded w-full" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : beritaList.length === 0 ? (
          <div className="text-center py-24">
            <Newspaper size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400">Belum ada berita{q ? ` untuk "${q}"` : ''}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beritaList.map(item => (
              <Link key={item.id} to={`/berita/${item.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                  {item.gambar_url
                    ? <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full flex items-center justify-center"><Newspaper size={36} className="text-blue-200" /></div>
                  }
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full capitalize">{item.kategori}</span>
                  <h3 className="mt-3 font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors font-heading leading-snug">{item.judul}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {formatTanggal(item.tanggal_publikasi)}</span>
                    {item.views > 0 && <span>{item.views} dilihat</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronLeft size={18} />
            </button>
            {[...Array(lastPage)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'
                }`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(lastPage, p + 1))} disabled={page === lastPage}
              className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
