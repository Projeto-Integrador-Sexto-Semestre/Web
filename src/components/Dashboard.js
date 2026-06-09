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
      label: "Luminosidade",
      value: formatValue(payload.luminosity),
      unit: "%",
      status: payload.luminosity > 20 ? "Ambiente claro" : "Ambiente escuro",
      tone: "light"
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
        <p>Leituras integradas ao backend SmartHouse para acompanhar temperatura, luminosidade, movimento e disponibilidade dos dispositivos da casa.</p>
      </div>
      <div class="hero-metrics">
        <span><small>Conexao</small><strong>${connected ? "Online" : "Offline"}</strong></span>
        <span><small>Dispositivo</small><strong>${payload.deviceId ?? "--"}</strong></span>
        <span><small>Topico</small><strong>${mqtt?.topic ?? "home/+/telemetry"}</strong></span>
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
        </div>
        <div class="room-list">
          <span><b>Sala</b> Temperatura ${formatValue(payload.temperature)} C</span>
          <span><b>Cozinha</b> Luminosidade ${formatValue(payload.luminosity)}%</span>
          <span><b>Garagem</b> Movimento ${payload.motion ? "detectado" : "normal"}</span>
        </div>
      </article>
      <article class="chart-card">
        <div class="panel-title">
          <h2>Alertas recentes</h2>
          <span>${payload.motion ? "1 ativo" : "0 ativos"}</span>
        </div>
        <div class="alert-list">
          <span class="is-ok">Temperatura estavel</span>
          <span class="is-ok">Luminosidade monitorada</span>
          <span class="is-ok">Movimento sem ocorrencia</span>
        </div>
      </article>
    </section>

  `;
}
