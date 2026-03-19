import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBerita } from '@/api/services'
import { Calendar, ArrowLeft, User, Eye, Newspaper } from 'lucide-react'

const formatTanggal = (str) => str
  ? new Date(str).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : ''

export default function BeritaDetailPage() {
  const { id } = useParams()
  const { data: berita, isLoading, isError } = useQuery({
    queryKey: ['berita-detail', id],
    queryFn: () => getBerita(id).then(r => r.data),
  })

  if (isLoading) return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
      <div className="h-64 bg-gray-200 rounded-2xl" />
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-gray-200 rounded w-full" />)}
      </div>
    </div>
  )

  if (isError || !berita) return (
    <div className="text-center py-24">
      <Newspaper size={48} className="mx-auto text-gray-200 mb-4" />
      <p className="text-gray-400">Berita tidak ditemukan.</p>
      <Link to="/berita" className="mt-4 inline-block text-blue-600 hover:underline">← Kembali ke Berita</Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <Link to="/berita" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-6 transition-colors">
          <ArrowLeft size={15} /> Kembali ke Berita
        </Link>

        <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Gambar */}
          {berita.gambar_url && (
            <div className="w-full h-72 sm:h-96 overflow-hidden">
              <img src={berita.gambar_url} alt={berita.judul} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-6 sm:p-10">
            {/* Kategori */}
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full capitalize">
              {berita.kategori}
            </span>

            {/* Judul */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 font-heading leading-snug">
              {berita.judul}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-4 mb-8 text-sm text-gray-400 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {formatTanggal(berita.tanggal_publikasi)}
              </span>
              {berita.penulis && (
                <span className="flex items-center gap-1.5">
                  <User size={14} /> {berita.penulis.name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Eye size={14} /> {berita.views} kali dilihat
              </span>
            </div>

            {/* Konten */}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                prose-headings:font-heading prose-headings:text-gray-900
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: berita.konten }}
            />
          </div>
        </article>

        {/* Back btn */}
        <div className="mt-8">
          <Link to="/berita"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} /> Kembali ke daftar berita
          </Link>
        </div>
      </div>
    </div>
  )
}
