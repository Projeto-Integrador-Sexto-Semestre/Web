const nestedValue = (row, fieldName) => {
  if (fieldName.endsWith("Id")) {
    const relation = fieldName.slice(0, -2);
    return row[fieldName] ?? row[relation]?.id ?? "";
  }

  const relationMap = {
    mqttTopic: row.mqttTopic,
    eventType: row.eventType,
    canControlDevices: row.canControlDevices,
    canEditStructure: row.canEditStructure,
    canViewLogs: row.canViewLogs
  };

  return relationMap[fieldName] ?? row[fieldName] ?? "";
};

export function DataTable({ entity, rows, loading }) {
  const visibleFields = entity.fields.filter((field) => !field.hideInTable);
  const canUpdate = Boolean(entity.updateMethod);

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
              ${visibleFields.map((field) => `<th>${field.label}</th>`).join("")}
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    <td data-label="ID">${row.id}</td>
                    ${visibleFields.map((field) => `<td data-label="${field.label}">${nestedValue(row, field.name)}</td>`).join("")}
                    <td class="table-actions" data-label="Acoes">
                      ${canUpdate ? `<button data-update="${row.id}">Editar</button>` : ""}
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
