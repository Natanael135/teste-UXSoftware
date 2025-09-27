const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://teste-uxsoftware-backend.onrender.com";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
}

async function request<T>(url: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = (options.headers as Record<string, string>) || {};
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers
  });
  if (!res.ok) {
    let errorMsg = "Erro na requisição";
    try { const data = await res.json(); errorMsg = data.message || errorMsg; } catch {}
    throw new Error(errorMsg);
  }
  return res.json();
}

export const api = {
  get: async <T = unknown>(url: string, auth = false): Promise<T> => {
    return request<T>(url, { method: "GET" }, auth);
  },
  post: async <T = unknown>(url: string, data: unknown, auth = false, isFormData = false): Promise<T> => {
    let body: BodyInit;
    const headers: HeadersInit = {};
    if (isFormData) {
      body = data as BodyInit;
    } else {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }
    return request<T>(url, { method: "POST", body, headers }, auth);
  },
  put: async <T = unknown>(url: string, data: unknown, auth = false, isFormData = false): Promise<T> => {
    let body: BodyInit;
    const headers: HeadersInit = {};
    if (isFormData) {
      body = data as BodyInit;
    } else {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }
    return request<T>(url, { method: "PUT", body, headers }, auth);
  },
  patch: async <T = unknown>(url: string, data: unknown, auth = false): Promise<T> => {
    return request<T>(url, { method: "PATCH", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }, auth);
  },
  delete: async <T = unknown>(url: string, data?: unknown, auth = false): Promise<T> => {
    const options: RequestInit = { method: "DELETE" };
    if (data) {
      options.body = JSON.stringify(data);
      options.headers = { "Content-Type": "application/json" };
    }
    return request<T>(url, options, auth);
  },
};