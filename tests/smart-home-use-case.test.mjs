import test from "node:test";
import assert from "node:assert/strict";
import { mockApi } from "../src/services/mockApi.js";
import { Dashboard } from "../src/components/Dashboard.js";

test("CT01 - exibe dashboard com leituras normais do MQTT", async () => {
  const mqtt = await mockApi.mqttSnapshot();
  const html = Dashboard({ mqtt });

  assert.equal(mqtt.connected, true);
  assert.match(html, /Monitoramento dos sensores/);
  assert.match(html, /26\.4/);
  assert.match(html, /Seguro/);
  assert.match(html, /Normal/);
});

test("CT02 - classifica gas acima do limite como atencao", () => {
  const html = Dashboard({
    mqtt: {
      connected: true,
      topic: "home/+/telemetry",
      lastPayload: {
        deviceId: "esp32-cozinha",
        temperature: 26,
        humidity: 55,
        gasPpm: 181,
        luminosity: 60,
        smokePpm: 9,
        motion: false,
        flame: false
      }
    }
  });

  assert.match(html, /Gas/);
  assert.match(html, /Atencao/);
});

test("CT03 - classifica fumaca acima do limite como atencao", () => {
  const html = Dashboard({
    mqtt: {
      connected: true,
      topic: "home/+/telemetry",
      lastPayload: {
        deviceId: "esp32-sala",
        temperature: 24,
        humidity: 50,
        gasPpm: 100,
        luminosity: 40,
        smokePpm: 26,
        motion: false,
        flame: false
      }
    }
  });

  assert.match(html, /Fumaca/);
  assert.match(html, /Atencao/);
});

test("CT04 - exibe valores ausentes como placeholder seguro", () => {
  const html = Dashboard({ mqtt: { connected: false, lastPayload: {} } });

  assert.match(html, /Offline/);
  assert.match(html, /--/);
});
