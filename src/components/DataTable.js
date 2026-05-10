export function DataTable({ entity, rows, loading }) {
  return `
    <div class="panel table-panel">
      <div class="panel-title">
        <h2>Registros</h2>
        <span>${loading ? "Carregando" : `${rows.length} itens`}</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              ${entity.fields.map((field) => `<th>${field.label}</th>`).join("")}
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <td>${row.id}</td>
                    ${entity.fields.map((field) => `<td>${row[field.name] ?? ""}</td>`).join("")}
                    <td class="table-actions">
                      <button data-update="${row.id}">Editar</button>
                      <button data-delete="${row.id}">Excluir</button>
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
