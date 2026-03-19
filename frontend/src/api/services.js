import api from '@/api/axios'

// Auth
export const loginUser    = (data) => api.post('/auth/login', data)
export const logoutUser   = ()     => api.post('/auth/logout')
export const getMe        = ()     => api.get('/auth/me')

// Profil Sekolah
export const getProfilSekolah    = ()     => api.get('/v1/profil-sekolah')
export const updateProfilSekolah = (data) => api.put('/v1/admin/profil-sekolah', data)

// Berita
export const getBeritaList = (params) => api.get('/v1/berita', { params })
export const getBerita     = (id)     => api.get(`/v1/berita/${id}`)
export const createBerita  = (data)   => api.post('/v1/admin/berita', data)
export const updateBerita  = (id, data) => api.put(`/v1/admin/berita/${id}`, data)
export const deleteBerita  = (id)     => api.delete(`/v1/admin/berita/${id}`)

// Pengumuman
export const getPengumumanList = (params) => api.get('/v1/pengumuman', { params })
export const getPengumuman     = (id)     => api.get(`/v1/pengumuman/${id}`)
export const createPengumuman  = (data)   => api.post('/v1/admin/pengumuman', data)
export const updatePengumuman  = (id, data) => api.put(`/v1/admin/pengumuman/${id}`, data)
export const deletePengumuman  = (id)     => api.delete(`/v1/admin/pengumuman/${id}`)

// Guru
export const getGuruList  = (params)     => api.get('/v1/guru', { params })
export const getGuru      = (id)         => api.get(`/v1/guru/${id}`)
export const createGuru   = (data)       => api.post('/v1/admin/guru', data)
export const updateGuru   = (id, data)   => api.put(`/v1/admin/guru/${id}`, data)
export const deleteGuru   = (id)         => api.delete(`/v1/admin/guru/${id}`)

// Siswa
export const getSiswaList  = (params)   => api.get('/v1/siswa', { params })
export const getSiswa      = (id)       => api.get(`/v1/siswa/${id}`)
export const createSiswa   = (data)     => api.post('/v1/admin/siswa', data)
export const updateSiswa   = (id, data) => api.put(`/v1/admin/siswa/${id}`, data)
export const deleteSiswa   = (id)       => api.delete(`/v1/admin/siswa/${id}`)

// Kelas
export const getKelasList  = (params)   => api.get('/v1/kelas', { params })
export const createKelas   = (data)     => api.post('/v1/admin/kelas', data)
export const updateKelas   = (id, data) => api.put(`/v1/admin/kelas/${id}`, data)
export const deleteKelas   = (id)       => api.delete(`/v1/admin/kelas/${id}`)

// Ekstrakulikuler
export const getEkstraList    = (params)   => api.get('/v1/ekstrakulikuler', { params })
export const getEkstra        = (id)       => api.get(`/v1/ekstrakulikuler/${id}`)
export const createEkstra     = (data)     => api.post('/v1/admin/ekstrakulikuler', data)
export const updateEkstra     = (id, data) => api.put(`/v1/admin/ekstrakulikuler/${id}`, data)
export const deleteEkstra     = (id)       => api.delete(`/v1/admin/ekstrakulikuler/${id}`)

// Fasilitas
export const getFasilitasList  = (params)   => api.get('/v1/fasilitas', { params })
export const createFasilitas   = (data)     => api.post('/v1/admin/fasilitas', data)
export const updateFasilitas   = (id, data) => api.put(`/v1/admin/fasilitas/${id}`, data)
export const deleteFasilitas   = (id)       => api.delete(`/v1/admin/fasilitas/${id}`)

// Galeri
export const getGaleriList   = (params)   => api.get('/v1/galeri', { params })
export const createGaleri    = (data)     => api.post('/v1/admin/galeri', data)
export const updateGaleri    = (id, data) => api.put(`/v1/admin/galeri/${id}`, data)
export const deleteGaleri    = (id)       => api.delete(`/v1/admin/galeri/${id}`)

// Prestasi
export const getPrestasiList  = (params)   => api.get('/v1/prestasi', { params })
export const getPrestasi      = (id)       => api.get(`/v1/prestasi/${id}`)
export const createPrestasi   = (data)     => api.post('/v1/admin/prestasi', data)
export const updatePrestasi   = (id, data) => api.put(`/v1/admin/prestasi/${id}`, data)
export const deletePrestasi   = (id)       => api.delete(`/v1/admin/prestasi/${id}`)

// Agenda
export const getAgendaList   = (params)   => api.get('/v1/agenda', { params })
export const getAgenda       = (id)       => api.get(`/v1/agenda/${id}`)
export const createAgenda    = (data)     => api.post('/v1/admin/agenda', data)
export const updateAgenda    = (id, data) => api.put(`/v1/admin/agenda/${id}`, data)
export const deleteAgenda    = (id)       => api.delete(`/v1/admin/agenda/${id}`)

// PPDB
export const submitPpdb  = (data) => api.post('/v1/ppdb', data)
export const getPpdbList = ()     => api.get('/v1/admin/ppdb')

// Kontak
export const sendKontak     = (data) => api.post('/v1/kontak', data)   // alias publik
export const submitKontak   = (data) => api.post('/v1/kontak', data)
export const getKontakList  = ()     => api.get('/v1/admin/kontak')
export const markKontakRead = (id)   => api.patch(`/v1/admin/kontak/${id}/read`)
