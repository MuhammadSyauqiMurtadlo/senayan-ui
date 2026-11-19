import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import { deleteKaryawan, getKaryawanList } from "../services/api";

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatTanggal = (value) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

export default function KaryawanList() {
  const location = useLocation();

  const [karyawan, setKaryawan] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(location.state?.message || "");

  // Debounce pencarian agar tidak memanggil API di setiap ketikan
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Ambil data dari API
  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await getKaryawanList({ page, search });
        if (ignore) return;
        setKaryawan(result.data);
        setMeta(result.meta);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [page, search, reloadKey]);

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus data karyawan "${item.nama_lengkap}"?`)) return;

    try {
      const result = await deleteKaryawan(item.id);
      setMessage(result.message);
      setError("");

      if (karyawan.length === 1 && page > 1) {
        setPage(page - 1); // halaman terakhir kosong -> mundur satu halaman
      } else {
        setReloadKey((key) => key + 1);
      }
    } catch (err) {
      setMessage("");
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Cari nama, NIK, email, departemen, jabatan..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Link to="/karyawan/tambah" className="btn btn-primary">
          + Tambah Karyawan
        </Link>
      </div>

      {message && (
        <div className="alert alert-success">
          {message}
          <button
            className="alert-close"
            onClick={() => setMessage("")}
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>NIK</th>
              <th>Nama Lengkap</th>
              <th>Departemen / Jabatan</th>
              <th>Status</th>
              <th>Tanggal Masuk</th>
              <th>Gaji Pokok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="center">
                  Memuat data...
                </td>
              </tr>
            ) : karyawan.length === 0 ? (
              <tr>
                <td colSpan="8" className="center">
                  {search
                    ? "Data tidak ditemukan."
                    : "Belum ada data karyawan."}
                </td>
              </tr>
            ) : (
              karyawan.map((item, index) => (
                <tr key={item.id}>
                  <td>{(meta?.from ?? 1) + index}</td>
                  <td>{item.nik}</td>
                  <td>
                    <strong>{item.nama_lengkap}</strong>
                    <div className="muted">{item.email}</div>
                  </td>
                  <td>
                    {item.departemen}
                    <div className="muted">{item.jabatan}</div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-${item.status_karyawan.toLowerCase()}`}
                    >
                      {item.status_karyawan}
                    </span>
                  </td>
                  <td>{formatTanggal(item.tanggal_masuk)}</td>
                  <td>{formatRupiah(item.gaji_pokok)}</td>
                  <td className="actions">
                    <Link
                      to={`/karyawan/${item.id}/edit`}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {meta && (
        <div className="table-footer">
          <span className="muted">
            Menampilkan {meta.from ?? 0} - {meta.to ?? 0} dari {meta.total} data
          </span>
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
