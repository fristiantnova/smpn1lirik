import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getBeritaList, getAgendaList, getPengumumanList, getProfilSekolah } from '@/api/services'
import { ArrowRight, Calendar, Newspaper, Megaphone, Trophy, Users, BookOpen, Star, ChevronRight } from 'lucide-react'

// ────────────────────────────────────────────────────────────
// Helper: format tanggal Indonesia
const formatTanggal = (str) => {
  if (!str) return ''
  return new Date(str).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ────────────────────────────────────────────────────────────
// Sub-components
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-4 bg-white rounded-2xl p-5 shadow-md border-l-4 ${color} card-hover`}>
      <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-').replace('-600', '-100')}`}>
        <Icon size={24} className={color.replace('border-', 'text-')} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 font-heading">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  )
}

function BeritaCard({ item }) {
  return (
    <Link to={`/berita/${item.id}`} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
        {item.gambar_url
          ? <img src={item.gambar_url} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <div className="w-full h-full flex items-center justify-center"><Newspaper size={40} className="text-blue-200" /></div>
        }
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {item.kategori}
        </span>
        <h3 className="mt-3 font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors font-heading">
          {item.judul}
        </h3>
        <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
          <Calendar size={11} /> {formatTanggal(item.tanggal_publikasi)}
        </p>
      </div>
    </Link>
  )
}

function PengumumanItem({ item }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0 border-gray-100">
      <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.judul}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatTanggal(item.created_at)}</p>
      </div>
      {item.file_url && (
        <a href={item.file_url} target="_blank" rel="noreferrer"
          className="text-xs text-blue-600 hover:underline flex-shrink-0">
          Unduh
        </a>
      )}
    </div>
  )
}

function AgendaItem({ item }) {
  const tgl = new Date(item.tanggal_mulai)
  return (
    <div className="flex items-center gap-4 py-3 border-b last:border-0 border-gray-100">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white">
        <span className="text-lg font-bold leading-none">{tgl.getDate()}</span>
        <span className="text-xs">{tgl.toLocaleDateString('id-ID', { month: 'short' })}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.judul}</p>
        <p className="text-xs text-gray-400 mt-0.5">{item.lokasi || 'Lihat detail'}</p>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Main Component
export default function HomePage() {
  const { data: profil } = useQuery({ queryKey: ['profil'], queryFn: () => getProfilSekolah().then(r => r.data) })
  const { data: beritaData } = useQuery({ queryKey: ['beranda-berita'], queryFn: () => getBeritaList({ per_page: 6 }).then(r => r.data) })
  const { data: pengumumanData } = useQuery({ queryKey: ['beranda-pengumuman'], queryFn: () => getPengumumanList({ per_page: 5 }).then(r => r.data) })
  const { data: agendaData } = useQuery({ queryKey: ['beranda-agenda'], queryFn: () => getAgendaList({ per_page: 5 }).then(r => r.data) })

  const beritaList    = beritaData?.data ?? []
  const pengumumanList = pengumumanData?.data ?? []
  const agendaList    = agendaData?.data ?? []

  return (
    <div className="animate-fade-in">

      {/* ====== HERO ====== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.03%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-white">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-block bg-white/15 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
              🎓 Selamat Datang di Website Resmi
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              SMP Negeri 2{' '}
              <span className="text-yellow-300">Lirik</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mb-10 leading-relaxed">
              {profil?.visi || 'Membentuk generasi yang cerdas, berintegritas, dan berdaya saing tinggi dalam era global melalui pendidikan berkualitas.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/profil"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Profil Sekolah <ArrowRight size={18} />
              </Link>
              <Link to="/ppdb"
                className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Daftar PPDB ✨
              </Link>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 20C480 40 240 0 0 30L0 60Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users}    label="Siswa Aktif"  value="480+"   color="border-blue-600" />
          <StatCard icon={BookOpen} label="Tenaga Didik" value="32"     color="border-green-600" />
          <StatCard icon={Trophy}   label="Prestasi"     value="50+"    color="border-yellow-500" />
          <StatCard icon={Star}     label="Ekstrakulikuler" value="10+" color="border-purple-600" />
        </div>
      </section>

      {/* ====== SAMBUTAN ====== */}
      {profil?.sambutan_kepala_sekolah && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center flex-shrink-0">
              <Users size={56} className="text-blue-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Sambutan</span>
              <h2 className="text-2xl font-bold mt-1 mb-3 font-heading text-gray-900">Kepala Sekolah</h2>
              <p className="text-gray-600 leading-relaxed line-clamp-4">{profil.sambutan_kepala_sekolah}</p>
              <p className="mt-4 font-semibold text-gray-800">{profil.kepala_sekolah || 'Kepala Sekolah'}</p>
              <p className="text-sm text-gray-500">NIP. {profil.nip_kepala_sekolah || '-'}</p>
            </div>
          </div>
        </section>
      )}

      {/* ====== BERITA TERBARU ====== */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Terbaru</span>
              <h2 className="text-3xl font-bold mt-1 font-heading text-gray-900">Berita Sekolah</h2>
            </div>
            <Link to="/berita" className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:gap-2 transition-all">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>

          {beritaList.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Belum ada berita.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beritaList.map(item => <BeritaCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </section>

      {/* ====== PENGUMUMAN + AGENDA ====== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Pengumuman */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Megaphone size={20} className="text-orange-600" />
                </div>
                <h2 className="text-lg font-bold font-heading text-gray-900">Pengumuman</h2>
              </div>
              <Link to="/pengumuman" className="text-sm text-blue-600 hover:underline">Semua</Link>
            </div>
            {pengumumanList.length === 0
              ? <p className="text-gray-400 text-sm text-center py-8">Tidak ada pengumuman.</p>
              : pengumumanList.map(item => <PengumumanItem key={item.id} item={item} />)
            }
          </div>

          {/* Agenda */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Calendar size={20} className="text-green-600" />
                </div>
                <h2 className="text-lg font-bold font-heading text-gray-900">Agenda Mendatang</h2>
              </div>
              <Link to="/agenda" className="text-sm text-blue-600 hover:underline">Semua</Link>
            </div>
            {agendaList.length === 0
              ? <p className="text-gray-400 text-sm text-center py-8">Tidak ada agenda mendatang.</p>
              : agendaList.map(item => <AgendaItem key={item.id} item={item} />)
            }
          </div>
        </div>
      </section>

      {/* ====== CTA PPDB ====== */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Penerimaan Peserta Didik Baru (PPDB)
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Daftarkan putra-putri Anda sekarang! Pendaftaran dilakukan secara online, mudah dan cepat.
          </p>
          <Link to="/ppdb"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Daftar Sekarang <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
