import { EntityForm } from "./EntityForm.js";
import { DataTable } from "./DataTable.js";

export function CrudView({ entity, rows, loading }) {
  if (!entity) return "";

  return `
    <section class="content-header">
      <div>
        <p class="eyebrow">${entity.groupTitle}</p>
        <h1>CRUD ${entity.label}</h1>
        <p>Endpoint preparado: <code>${entity.endpoint}</code></p>
      </div>
      <span class="status-pill">Mock API</span>
    </section>
    <section class="work-grid">
      ${EntityForm({ entity })}
      ${DataTable({ entity, rows, loading })}
    </section>
  `;
}
