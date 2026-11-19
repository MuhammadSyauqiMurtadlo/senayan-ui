import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KaryawanForm from "../components/KaryawanForm";
import { createKaryawan } from "../services/api";

export default function KaryawanCreate() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setErrors({});
    setError("");

    try {
      const result = await createKaryawan(values);
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

  return (
    <div className="card">
      <h2 className="page-title">Tambah Karyawan</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <KaryawanForm
        errors={errors}
        submitting={submitting}
        submitLabel="Simpan"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
