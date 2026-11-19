const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...options,
    });
  } catch {
    throw new Error("Tidak dapat terhubung ke server. Periksa koneksi Anda.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || "Terjadi kesalahan pada server.");
    error.status = response.status;
    error.errors = data?.errors || {};
    throw error;
  }

  return data;
}

export function getKaryawanList({ page = 1, search = "" } = {}) {
  const params = new URLSearchParams({ page });
  if (search) params.set("search", search);
  return request(`/karyawan?${params.toString()}`);
}

export function getKaryawan(id) {
  return request(`/karyawan/${id}`);
}

export function createKaryawan(payload) {
  return request("/karyawan", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateKaryawan(id, payload) {
  return request(`/karyawan/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteKaryawan(id) {
  return request(`/karyawan/${id}`, { method: "DELETE" });
}
