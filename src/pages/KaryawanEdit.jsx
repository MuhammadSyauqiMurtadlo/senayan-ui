import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import KaryawanForm from "../components/KaryawanForm";
import { getKaryawan, updateKaryawan } from "../services/api";

export default function KaryawanEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [karyawan, setKaryawan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;

    getKaryawan(id)
      .then((result) => {
        if (!ignore) setKaryawan(result.data);
      })
      .catch((err) => {
        if (!ignore) setLoadError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setErrors({});
    setError("");

    try {
      const result = await updateKaryawan(id, values);
      navigate("/", { state: { message: result.message } });
    } catch (err) {
      if (err.status === 422) {
        setErrors(err.errors);
        setError("Periksa kembali isian formulir Anda.");
      } else {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="card">Memuat data...</div>;
  }

  if (loadError) {
    return (
      <div className="card">
        <div className="alert alert-danger">{loadError}</div>
        <Link to="/" className="btn btn-secondary">
          Kembali ke daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="page-title">Edit Karyawan</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <KaryawanForm
        initialValues={karyawan}
        errors={errors}
        submitting={submitting}
        submitLabel="Perbarui"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
