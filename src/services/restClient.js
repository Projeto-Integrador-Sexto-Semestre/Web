export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/backend";
const normalizePayload = (payload) =>
  Object.fromEntries(
    Object.entries(payload)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => {
        if (value === "true") return [key, true];
        if (value === "false") return [key, false];
        if (key.endsWith("Id")) return [key, Number(value)];
        return [key, value];
      })
  );
export async function restRequest(path, options = {}) {
  const token = localStorage.getItem("jwtToken");
  const body = options.body && typeof options.body !== "string" ? JSON.stringify(normalizePayload(options.body)) : options.body;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    },
    body
  });
  if (!response.ok) {
    throw new Error(`Servidor ${response.status}: ${await response.text()}`);
  }
  return response.status === 204 ? null : response.json();
}
export const restApi = {
  async login(payload) {
    return restRequest("/users/login", { method: "POST", body: payload });
  },
  async register(payload) {
    return restRequest("/users/register", { method: "POST", body: payload });
  },
  async profiles() {
    return restRequest("/profiles");
  },
  async list(entity) {
    return restRequest(entity.endpoint);
  },
  async create(entity, payload) {
    return restRequest(entity.createEndpoint ?? entity.endpoint, { method: "POST", body: payload });
  },
  async update(entity, id, payload) {
    if (entity.updateMethod === "PUT") {
      return restRequest(`${entity.endpoint}/${id}`, { method: "PUT", body: payload });
    }
    if (entity.updateMethod === "PATCH_STATUS") {
      return restRequest(`${entity.endpoint}/${id}/status`, { method: "PATCH", body: { status: payload.status } });
    }
    throw new Error("Este recurso nao possui endpoint de edicao no backend.");
  },
  async remove(entity, id) {
    return restRequest(`${entity.endpoint}/${id}`, { method: "DELETE" });
  },
  async mqttSnapshot() {
    const [devices, sensors] = await Promise.all([
      restRequest("/devices").catch(() => []),
      restRequest("/sensors").catch(() => [])
    ]);
    const getLatest = async (sensorName) => {
      const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const sensor = sensors.find(s => normalize(s.name).includes(sensorName));
      if (!sensor) return "--";
      const history = await restRequest(`/sensor-history/sensor/${sensor.id}`).catch(() => []);
      return history[0]?.value ?? "--";
    };
    const [temperature, luminosity, motion] = await Promise.all([
      getLatest("temperatura"),
      getLatest("luminosidade"),
      getLatest("presenca")
    ]);
    const firstDevice = devices[0] ?? {};
    return {
      broker: "Backend SmartHouse",
      topic: firstDevice.topic ?? "casa/+/telemetry",
      connected: true,
      lastPayload: {
        deviceId: firstDevice.name ?? "Sem dispositivo",
        temperature,
        luminosity,
        motion: ["1", "true", "sim", "detectado"].includes(String(motion).toLowerCase())
      }
    };
  }
};
