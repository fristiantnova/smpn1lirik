import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { logoutUser } from '@/api/services'
import {
  LayoutDashboard, Newspaper, Megaphone, Users, GraduationCap,
  Star, Image, Trophy, Calendar, MessageSquare, ClipboardList,
  Settings, LogOut, School, Building2, BookOpen
} from 'lucide-react'

const navItems = [
  { to: '/admin/dashboard',    label: 'Dashboard',      icon: LayoutDashboard   },
  { to: '/admin/berita',       label: 'Berita',         icon: Newspaper         },
  { to: '/admin/pengumuman',   label: 'Pengumuman',     icon: Megaphone         },
  { to: '/admin/guru',         label: 'Guru',           icon: Users             },
  { to: '/admin/siswa',        label: 'Siswa',          icon: GraduationCap     },
  { to: '/admin/kelas',        label: 'Kelas',          icon: BookOpen          },
  { to: '/admin/ekstrakulikuler', label: 'Ekskul',     icon: Star              },
  { to: '/admin/fasilitas',    label: 'Fasilitas',      icon: Building2         },
  { to: '/admin/galeri',       label: 'Galeri',         icon: Image             },
  { to: '/admin/prestasi',     label: 'Prestasi',       icon: Trophy            },
  { to: '/admin/agenda',       label: 'Agenda',         icon: Calendar          },
  { to: '/admin/ppdb',         label: 'PPDB',           icon: ClipboardList     },
  { to: '/admin/kontak',       label: 'Kontak',         icon: MessageSquare     },
  { to: '/admin/profil-sekolah', label: 'Profil Sekolah', icon: School         },
]

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try { await logoutUser() } catch (_) {}
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-700">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Panel Admin</p>
          <h2 className="text-lg font-bold font-heading leading-tight">SMPN 2 Lirik</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div className="border-t border-gray-700 px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0) ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name ?? 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email ?? ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={15} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-base font-semibold text-gray-700 font-heading">Panel Admin SMPN 2 Lirik</h2>
          <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
            Administrator
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
