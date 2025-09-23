const API_URL = "https://teste-uxsoftware-backend.onrender.com";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || "";
  }
  return "";
}

async function request<T>(url: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers: HeadersInit = options.headers || {};
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
  get: async (url: string, auth = false) => {
    return request<any>(url, { method: "GET" }, auth);
  },
  post: async (url: string, data: any, auth = false, isFormData = false) => {
    let body: BodyInit;
    let headers: HeadersInit = {};
    if (isFormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }
    return request<any>(url, { method: "POST", body, headers }, auth);
  },
  put: async (url: string, data: any, auth = false, isFormData = false) => {
    let body: BodyInit;
    let headers: HeadersInit = {};
    if (isFormData) {
      body = data;
    } else {
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }
    return request<any>(url, { method: "PUT", body, headers }, auth);
  },
  patch: async (url: string, data: any, auth = false) => {
    return request<any>(url, { method: "PATCH", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }, auth);
  },
  delete: async (url: string, data?: any, auth = false) => {
    let options: RequestInit = { method: "DELETE" };
    if (data) {
      options.body = JSON.stringify(data);
      options.headers = { "Content-Type": "application/json" };
    }
    return request<any>(url, options, auth);
  },
};