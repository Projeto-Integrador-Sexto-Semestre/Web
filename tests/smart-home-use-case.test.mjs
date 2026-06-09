import test from "node:test";
import assert from "node:assert/strict";
import { mockApi } from "../src/services/mockApi.js";
import { Dashboard } from "../src/components/Dashboard.js";
import { EntityForm } from "../src/components/EntityForm.js";
import { entities } from "../src/data/entities.js";

test("CT01 - exibe dashboard com leituras normais do MQTT", async () => {
  const mqtt = await mockApi.mqttSnapshot();
  const html = Dashboard({ mqtt });

  assert.equal(mqtt.connected, true);
  assert.match(html, /Monitoramento dos sensores/);
  assert.match(html, /26\.4/);
  assert.match(html, /Luminosidade/);
  assert.match(html, /Movimento/);
  assert.match(html, /Normal/);
  assert.doesNotMatch(html, /Gas|Fumaca|Umidade/);
});

test("CT02 - classifica luminosidade conforme leitura", () => {
  const html = Dashboard({
    mqtt: {
      connected: true,
      topic: "home/+/telemetry",
      lastPayload: {
        deviceId: "esp32-cozinha",
        temperature: 26,
        luminosity: 60,
        motion: false
      }
    }
  });

  assert.match(html, /Luminosidade/);
  assert.match(html, /Ambiente claro/);
});

test("CT03 - classifica movimento detectado", () => {
  const html = Dashboard({
    mqtt: {
      connected: true,
      topic: "home/+/telemetry",
      lastPayload: {
        deviceId: "esp32-sala",
        temperature: 24,
        luminosity: 40,
        motion: true
      }
    }
  });

  assert.match(html, /Movimento/);
  assert.match(html, /Detectado/);
  assert.match(html, /Sim/);
});

test("CT04 - exibe valores ausentes como placeholder seguro", () => {
  const html = Dashboard({ mqtt: { connected: false, lastPayload: {} } });

  assert.match(html, /Offline/);
  assert.match(html, /--/);
});

test("CT05 - cadastro de usuario nao exige perfil", () => {
  const entity = entities.find((item) => item.key === "users");
  const html = EntityForm({ entity });

  assert.match(html, /name="name"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="password"/);
  assert.doesNotMatch(html, /profileId/);
});
