import { mockDatabase } from "../data/mockData.js";

const sleep = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = (value) => JSON.parse(JSON.stringify(value));

export const mockApi = {
  async list(entityKey) {
    await sleep();
    return clone(mockDatabase[entityKey] ?? []);
  },

  async create(entityKey, payload) {
    await sleep();
    const collection = mockDatabase[entityKey] ?? (mockDatabase[entityKey] = []);
    const nextId = Math.max(0, ...collection.map((item) => item.id ?? 0)) + 1;
    const item = { id: nextId, ...payload };
    collection.unshift(item);
    return clone(item);
  },

  async update(entityKey, id, payload) {
    await sleep();
    const collection = mockDatabase[entityKey] ?? [];
    const index = collection.findIndex((item) => item.id === Number(id));
    if (index >= 0) collection[index] = { ...collection[index], ...payload };
    return clone(collection[index]);
  },

  async remove(entityKey, id) {
    await sleep();
    const collection = mockDatabase[entityKey] ?? [];
    const index = collection.findIndex((item) => item.id === Number(id));
    if (index >= 0) collection.splice(index, 1);
    return { ok: true };
  },

  async mqttSnapshot() {
    await sleep(120);
    return {
      broker: "Mosquitto",
      topic: "home/+/telemetry",
      connected: true,
      lastPayload: {
        deviceId: "esp32-cozinha",
        temperature: 26.4,
        gasPpm: 118,
        motion: false
      }
    };
  }
};
