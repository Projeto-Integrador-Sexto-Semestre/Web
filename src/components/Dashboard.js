const formatValue = (value, fallback = "--") => value ?? fallback;

export function Dashboard({ mqtt }) {
  const payload = mqtt?.lastPayload ?? {};
  const connected = mqtt?.connected ?? false;

  const sensors = [
    {
      label: "Temperatura",
      value: formatValue(payload.temperature),
      unit: "C",
      status: payload.temperature > 30 ? "Alta" : "Normal",
      tone: "temperature"
    },
    {
      label: "Gas",
      value: formatValue(payload.gasPpm),
      unit: "ppm",
      status: payload.gasPpm > 180 ? "Atencao" : "Seguro",
      tone: "gas"
    },
    {
      label: "Umidade",
      value: formatValue(payload.humidity),
      unit: "%",
      status: "Estavel",
      tone: "humidity"
    },
    {
      label: "Luminosidade",
      value: formatValue(payload.luminosity),
      unit: "%",
      status: payload.luminosity > 20 ? "Ambiente claro" : "Ambiente escuro",
      tone: "light"
    },
    {
      label: "Fumaca",
      value: formatValue(payload.smokePpm),
      unit: "ppm",
      status: payload.smokePpm > 25 ? "Atencao" : "Normal",
      tone: "smoke"
    },
    {
      label: "Movimento",
      value: payload.motion ? "Sim" : "Nao",
      unit: "",
      status: payload.motion ? "Detectado" : "Sem movimento",
      tone: "motion"
    }
  ];

  return `
    <section class="hero sensor-hero">
      <div>
        <p class="eyebrow">Dashboard</p>
        <h1>Monitoramento dos sensores</h1>
        <p>Leituras e cadastros integrados ao backend SmartHouse para acompanhar temperatura, gas, fumaca, umidade, luminosidade e movimento da casa.</p>
      </div>
      <div class="hero-metrics">
        <span><strong>${connected ? "Online" : "Offline"}</strong> Conexao</span>
        <span><strong>${payload.deviceId ?? "--"}</strong> Dispositivo</span>
        <span><strong>${mqtt?.topic ?? "home/+/telemetry"}</strong> Topico</span>
      </div>
    </section>

    <section class="sensor-grid">
      ${sensors
        .map(
          (sensor) => `
            <article class="sensor-card ${sensor.tone}">
              <div class="sensor-card-header">
                <span>${sensor.label}</span>
                <b>${sensor.status}</b>
              </div>
              <div class="sensor-value">
                <strong>${sensor.value}</strong>
                ${sensor.unit ? `<small>${sensor.unit}</small>` : ""}
              </div>
            </article>
          `
        )
        .join("")}
    </section>

    <section class="sensor-overview">
      <article class="chart-card">
        <div class="panel-title">
          <h2>Ambientes monitorados</h2>
          <span>API</span>
        </div>
        <div class="room-list">
          <span><b>Cozinha</b> Gas ${formatValue(payload.gasPpm)} ppm</span>
          <span><b>Sala</b> Temperatura ${formatValue(payload.temperature)} C</span>
          <span><b>Garagem</b> Movimento ${payload.motion ? "detectado" : "normal"}</span>
        </div>
      </article>
      <article class="chart-card">
        <div class="panel-title">
          <h2>Alertas recentes</h2>
          <span>${payload.flame ? "1 ativo" : "0 ativos"}</span>
        </div>
        <div class="alert-list">
          <span class="is-ok">Gas dentro do limite</span>
          <span class="is-ok">Temperatura estavel</span>
          <span class="is-ok">Nenhuma chama detectada</span>
        </div>
      </article>
    </section>

  `;
}
