import { useState } from "react";
import { Link } from "react-router-dom";

const emptyForm = {
  nik: "",
  nama_lengkap: "",
  email: "",
  no_telepon: "",
  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  alamat: "",
  departemen: "",
  jabatan: "",
  status_karyawan: "",
  tanggal_masuk: "",
  gaji_pokok: "",
};

const toFormValues = (data) =>
  Object.keys(emptyForm).reduce(
    (acc, key) => ({ ...acc, [key]: data?.[key] ?? "" }),
    {},
  );

function Field({ label, error, full = false, children }) {
  return (
    <div className={`form-group ${full ? "full" : ""}`}>
      <label>{label}</label>
      {children}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
}

export default function KaryawanForm({
  initialValues,
  errors = {},
  submitting = false,
  submitLabel = "Simpan",
  onSubmit,
}) {
  const [values, setValues] = useState(() => toFormValues(initialValues));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const err = (name) => errors[name]?.[0];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="NIK" error={err("nik")}>
          <input
            name="nik"
            value={values.nik}
            onChange={handleChange}
            maxLength={20}
          />
        </Field>

        <Field label="Nama Lengkap" error={err("nama_lengkap")}>
          <input
            name="nama_lengkap"
            value={values.nama_lengkap}
            onChange={handleChange}
          />
        </Field>

        <Field label="Email" error={err("email")}>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </Field>

        <Field label="No. Telepon" error={err("no_telepon")}>
          <input
            type="tel"
            name="no_telepon"
            value={values.no_telepon}
            onChange={handleChange}
          />
        </Field>

        <Field label="Jenis Kelamin" error={err("jenis_kelamin")}>
          <select
            name="jenis_kelamin"
            value={values.jenis_kelamin}
            onChange={handleChange}
          >
            <option value="">-- Pilih --</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </Field>

        <Field label="Tempat Lahir" error={err("tempat_lahir")}>
          <input
            name="tempat_lahir"
            value={values.tempat_lahir}
            onChange={handleChange}
          />
        </Field>

        <Field label="Tanggal Lahir" error={err("tanggal_lahir")}>
          <input
            type="date"
            name="tanggal_lahir"
            value={values.tanggal_lahir}
            onChange={handleChange}
          />
        </Field>

        <Field label="Tanggal Masuk" error={err("tanggal_masuk")}>
          <input
            type="date"
            name="tanggal_masuk"
            value={values.tanggal_masuk}
            onChange={handleChange}
          />
        </Field>

        <Field label="Departemen" error={err("departemen")}>
          <input
            name="departemen"
            value={values.departemen}
            onChange={handleChange}
          />
        </Field>

        <Field label="Jabatan" error={err("jabatan")}>
          <input
            name="jabatan"
            value={values.jabatan}
            onChange={handleChange}
          />
        </Field>

        <Field label="Status Karyawan" error={err("status_karyawan")}>
          <select
            name="status_karyawan"
            value={values.status_karyawan}
            onChange={handleChange}
          >
            <option value="">-- Pilih --</option>
            <option value="Tetap">Tetap</option>
            <option value="Kontrak">Kontrak</option>
            <option value="Magang">Magang</option>
          </select>
        </Field>

        <Field label="Gaji Pokok (Rp)" error={err("gaji_pokok")}>
          <input
            type="number"
            min="0"
            name="gaji_pokok"
            value={values.gaji_pokok}
            onChange={handleChange}
          />
        </Field>

        <Field label="Alamat" error={err("alamat")} full>
          <textarea
            name="alamat"
            rows="3"
            value={values.alamat}
            onChange={handleChange}
          />
        </Field>
      </div>

      <div className="form-actions">
        <Link to="/" className="btn btn-secondary">
          Batal
        </Link>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
