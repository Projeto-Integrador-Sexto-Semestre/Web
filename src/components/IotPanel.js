export function IotPanel({ mqtt }) {
  const payload = mqtt?.lastPayload ?? {};

  return `
    <section class="iot-panel">
      <div>
        <p class="eyebrow">IoT via MQTT</p>
        <h2>ESP32 enviando telemetria para o broker</h2>
        <p>O backend Spring Boot deve assinar o topico e persistir leituras em <code>/api/sensor-readings</code>.</p>
      </div>
      <div class="telemetry">
        <span>Broker <strong>${mqtt?.broker ?? "Mosquitto"}</strong></span>
        <span>Topico <strong>${mqtt?.topic ?? "home/+/telemetry"}</strong></span>
        <span>Temp <strong>${payload.temperature ?? "--"} C</strong></span>
        <span>Gas <strong>${payload.gasPpm ?? "--"} ppm</strong></span>
      </div>
    </section>
  `;
}
