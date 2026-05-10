export function Dashboard({ groups }) {
  const crudCount = groups.reduce((total, group) => total + group.entities.length, 0);
  const moduleData = groups
    .map((group, index) => ({
      title: group.title,
      count: group.entities.length,
      tone: ["#4f46e5", "#0891b2", "#f59e0b", "#dc2626", "#7c3aed", "#0f766e", "#475569"][index % 7]
    }));
  const totalModules = groups.length;

  return `
    <section class="hero">
      <div>
        <p class="eyebrow">Projeto Integrador</p>
        <h1>Central de monitoramento residencial</h1>
        <p>Versao estatica com CRUDs mockados, contratos REST preparados e painel IoT simulando telemetria MQTT.</p>
      </div>
      <div class="hero-metrics">
        <span><strong>${crudCount}</strong> CRUDs</span>
        <span><strong>${totalModules}</strong> modulos</span>
        <span><strong>1</strong> IoT MQTT</span>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="chart-card">
        <div class="panel-title">
          <h2>Distribuicao dos CRUDs</h2>
          <span>${crudCount} telas</span>
        </div>
        <div class="bar-chart">
          ${moduleData
            .map(
              (item) => `
                <div class="bar-row">
                  <span>${item.title}</span>
                  <div class="bar-track"><i style="width:${(item.count / crudCount) * 100}%; background:${item.tone}"></i></div>
                  <strong>${item.count}</strong>
                </div>
              `
            )
            .join("")}
        </div>
      </article>
      <article class="chart-card signal-card">
        <div>
          <h2>Status do projeto</h2>
          <p>Mock pronto para validar telas agora e REST preparado para ligar no backend depois.</p>
        </div>
        <div class="donut-chart" style="--progress: 76">
          <span>76%</span>
        </div>
        <div class="signal-list">
          <span><b>REST</b> contratos definidos</span>
          <span><b>MQTT</b> telemetria simulada</span>
          <span><b>JWT</b> cliente preparado</span>
        </div>
      </article>
    </section>

    <section class="group-grid">
      ${groups
        .map(
          (group) => `
            <article class="group-card">
              <h2>${group.title}</h2>
              <p>${group.note}</p>
              <div>${group.entities.map((entity) => `<button data-nav="${entity.key}">${entity.label}</button>`).join("")}</div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
}
