import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

// Layouts
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout  from '@/components/layout/AdminLayout'

// Public Pages (placeholder — akan diisi bertahap)
import HomePage          from '@/pages/public/HomePage'
import ProfilPage        from '@/pages/public/ProfilPage'
import BeritaPage        from '@/pages/public/BeritaPage'
import BeritaDetailPage  from '@/pages/public/BeritaDetailPage'
import GuruPage          from '@/pages/public/GuruPage'
import EkstrakulikulerPage from '@/pages/public/EkstrakulikulerPage'
import FasilitasPage     from '@/pages/public/FasilitasPage'
import GaleriPage        from '@/pages/public/GaleriPage'
import PrestasiPage      from '@/pages/public/PrestasiPage'
import AgendaPage        from '@/pages/public/AgendaPage'
import PengumumanPage    from '@/pages/public/PengumumanPage'
import PpdbPage          from '@/pages/public/PpdbPage'
import KontakPage        from '@/pages/public/KontakPage'

// Admin Pages (placeholder — akan diisi bertahap)
import LoginPage       from '@/pages/admin/LoginPage'
import DashboardPage   from '@/pages/admin/DashboardPage'

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route element={<PublicLayout />}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/profil"        element={<ProfilPage />} />
          <Route path="/berita"        element={<BeritaPage />} />
          <Route path="/berita/:id"    element={<BeritaDetailPage />} />
          <Route path="/guru"          element={<GuruPage />} />
          <Route path="/ekstrakulikuler" element={<EkstrakulikulerPage />} />
          <Route path="/fasilitas"     element={<FasilitasPage />} />
          <Route path="/galeri"        element={<GaleriPage />} />
          <Route path="/prestasi"      element={<PrestasiPage />} />
          <Route path="/agenda"        element={<AgendaPage />} />
          <Route path="/pengumuman"    element={<PengumumanPage />} />
          <Route path="/ppdb"          element={<PpdbPage />} />
          <Route path="/kontak"        element={<KontakPage />} />
        </Route>

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          {/* Halaman admin lainnya akan ditambahkan di Phase 4 */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}
