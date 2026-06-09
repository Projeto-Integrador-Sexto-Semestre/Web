import { EntityForm } from "./EntityForm.js";
import { DataTable } from "./DataTable.js";

export function CrudView({ entity, rows, loading, lookups = {} }) {
  if (!entity) return "";

  return `
    <section class="content-header">
      <div>
        <p class="eyebrow">${entity.groupTitle}</p>
        <h1>${entity.label}</h1>
      </div>
    </section>
    <section class="work-grid">
      ${EntityForm({ entity, lookups })}
      ${DataTable({ entity, rows, loading, lookups })}
    </section>
  `;
}
