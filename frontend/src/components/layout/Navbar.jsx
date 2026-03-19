import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'

const navItems = [
  { to: '/',              label: 'Beranda' },
  { to: '/profil',        label: 'Profil',
    sub: [
      { to: '/profil',    label: 'Profil Sekolah' },
      { to: '/guru',      label: 'Guru & Staff' },
    ]
  },
  { to: '/berita',        label: 'Berita' },
  { to: '/pengumuman',    label: 'Pengumuman' },
  {
    label: 'Akademik',
    sub: [
      { to: '/ekstrakulikuler', label: 'Ekstrakulikuler' },
      { to: '/prestasi',        label: 'Prestasi' },
      { to: '/agenda',          label: 'Agenda' },
    ]
  },
  { to: '/fasilitas',    label: 'Fasilitas' },
  { to: '/galeri',       label: 'Galeri' },
  { to: '/kontak',       label: 'Kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup menu saat navigasi
  useEffect(() => { setIsOpen(false); setActiveDropdown(null) }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-shadow">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-tight font-heading">SMPN 2 Lirik</p>
              <p className="text-xs text-gray-500 leading-tight">Indragiri Hulu</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label} className="relative"
                  onMouseEnter={() => item.sub && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                {item.to && !item.sub ? (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {item.sub && activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 animate-fade-in">
                        {item.sub.map(sub => (
                          <NavLink key={sub.to} to={sub.to}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-sm transition-colors ${
                                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/ppdb"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95">
              Daftar PPDB
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 pb-4 border-t animate-fade-in-up">
            <ul className="mt-3 space-y-0.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.to && !item.sub ? (
                    <NavLink to={item.to}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <div>
                      <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                      {item.sub?.map(sub => (
                        <NavLink key={sub.to} to={sub.to}
                          className={({ isActive }) =>
                            `block px-6 py-2.5 text-sm transition-colors ${
                              isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 px-4">
              <Link to="/ppdb" className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg">
                Daftar PPDB
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
