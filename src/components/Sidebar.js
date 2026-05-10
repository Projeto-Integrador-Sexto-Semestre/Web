export function Sidebar({ groups, selectedKey }) {
  const navClass = (key) => (selectedKey === key ? "nav-button is-active" : "nav-button");

  return `
    <aside class="sidebar">
      <div class="brand">
        <span class="brand-mark">PI</span>
        <div>
          <strong>Smart Home</strong>
          <small>KMP + REST + MQTT</small>
        </div>
      </div>
      <button class="${navClass("dashboard")}" data-nav="dashboard">Dashboard</button>
      <div class="nav-groups">
        ${groups
          .map(
            (group) => `
              <section class="nav-group">
                <p>${group.title}</p>
                ${group.entities
                  .map((entity) => `<button class="${navClass(entity.key)}" data-nav="${entity.key}">${entity.label}</button>`)
                  .join("")}
              </section>
            `
          )
          .join("")}
      </div>
    </aside>
  `;
}
