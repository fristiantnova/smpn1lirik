import { Link } from 'react-router-dom'
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white font-heading">SMPN 2 Lirik</p>
                <p className="text-xs text-gray-400">Indragiri Hulu</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Sekolah Menengah Pertama Negeri 2 Lirik — Membentuk generasi yang cerdas, berkarakter, dan berprestasi.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Navigasi</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/',           label: 'Beranda' },
                { to: '/profil',     label: 'Profil Sekolah' },
                { to: '/berita',     label: 'Berita' },
                { to: '/pengumuman', label: 'Pengumuman' },
                { to: '/guru',       label: 'Guru & Staff' },
                { to: '/prestasi',   label: 'Prestasi' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white hover:pl-1 transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Program</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/ekstrakulikuler', label: 'Ekstrakulikuler' },
                { to: '/fasilitas',       label: 'Fasilitas' },
                { to: '/galeri',          label: 'Galeri' },
                { to: '/agenda',          label: 'Agenda Sekolah' },
                { to: '/ppdb',            label: 'PPDB Online' },
                { to: '/kontak',          label: 'Hubungi Kami' },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white hover:pl-1 transition-all duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Jl. Pelajar No. 1, Lirik, Indragiri Hulu, Riau</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-blue-400 flex-shrink-0" />
                <span>(0769) 123456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-blue-400 flex-shrink-0" />
                <span>info@smpn2lirik.sch.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {year} SMP Negeri 2 Lirik. Hak cipta dilindungi.</p>
          <a href="/admin/login" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
            <ExternalLink size={11} /> Panel Admin
          </a>
        </div>
      </div>
    </footer>
  )
}
