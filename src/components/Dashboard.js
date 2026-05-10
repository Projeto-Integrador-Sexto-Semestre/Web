export function Dashboard({ groups }) {
  const crudCount = groups.reduce((total, group) => total + group.entities.length, 0);

  return `
    <section class="hero">
      <div>
        <p class="eyebrow">Projeto Integrador</p>
        <h1>Central de monitoramento residencial</h1>
        <p>Versao estatica com CRUDs mockados, contratos REST preparados e painel IoT simulando telemetria MQTT.</p>
      </div>
      <div class="hero-metrics">
        <span><strong>${crudCount}</strong> CRUDs</span>
        <span><strong>7</strong> integrantes</span>
        <span><strong>1</strong> IoT MQTT</span>
      </div>
    </section>

    <section class="group-grid">
      ${groups
        .map(
          (group) => `
            <article class="group-card">
              <span>${group.owner}</span>
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
