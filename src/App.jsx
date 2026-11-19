import { Link, Route, Routes } from "react-router-dom";
import KaryawanList from "./pages/KaryawanList";
import KaryawanCreate from "./pages/KaryawanCreate";
import KaryawanEdit from "./pages/KaryawanEdit";

export default function App() {
  return (
    <>
      <header className="app-header">
        <div className="container">
          <Link to="/" className="brand">
            Manajemen Data Karyawan
          </Link>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<KaryawanList />} />
          <Route path="/karyawan/tambah" element={<KaryawanCreate />} />
          <Route path="/karyawan/:id/edit" element={<KaryawanEdit />} />
          <Route
            path="*"
            element={
              <div className="card">
                <h2>Halaman tidak ditemukan</h2>
                <Link to="/" className="btn btn-secondary">
                  Kembali ke daftar
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
