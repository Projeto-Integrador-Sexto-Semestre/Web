const API_BASE_URL = "http://localhost:8080";

export async function restRequest(path, options = {}) {
  const token = localStorage.getItem("jwtToken");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${await response.text()}`);
  }

  return response.status === 204 ? null : response.json();
}
