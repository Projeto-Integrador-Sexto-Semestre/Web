export function IotPanel({ mqtt }) {
  const payload = mqtt?.lastPayload ?? {};

  return `
    <section class="iot-panel">
      <div>
        <p class="eyebrow">IoT via MQTT</p>
        <h2>ESP32 enviando telemetria para o broker</h2>
        <p>O backend Spring Boot assina o topico e persiste leituras em <code>/sensor-history</code>.</p>
      </div>
      <div class="telemetry">
        <span>Broker <strong>${mqtt?.broker ?? "Mosquitto"}</strong></span>
        <span>Topico <strong>${mqtt?.topic ?? "home/+/telemetry"}</strong></span>
        <span>Temp <strong>${payload.temperature ?? "--"} C</strong></span>
        <span>Luz <strong>${payload.luminosity ?? "--"}%</strong></span>
        <span>Movimento <strong>${payload.motion ? "Detectado" : "Normal"}</strong></span>
      </div>
    </section>
  `;
}
