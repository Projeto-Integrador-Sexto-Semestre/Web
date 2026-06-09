const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const optionLabel = (item) => {
  const title = item.name ?? item.email ?? item.message ?? item.command ?? item.description ?? `Registro ${item.id}`;
  const detail = item.email ?? item.type ?? item.topic ?? item.mqttTopic ?? item.address ?? item.command ?? item.status ?? "";
  const suffix = detail && detail !== title ? ` - ${detail}` : "";
  return `${title}${suffix}`;
};

const relationSelect = ({ field, options, required }) => {
  const hasOptions = options.length > 0;
  const placeholder = field.optional ? "Nenhum" : hasOptions ? "Selecione uma opcao" : "Nenhum registro encontrado";

  return `
    <label>
      ${field.label}
      <select name="${field.name}" ${required} ${hasOptions ? "" : "disabled"}>
        <option value="" ${field.optional ? "" : "disabled selected"}>${placeholder}</option>
        ${options
          .map((option) => `<option value="${escapeHtml(option.id)}">${escapeHtml(optionLabel(option))}</option>`)
          .join("")}
      </select>
    </label>
  `;
};

export function EntityForm({ entity, lookups = {} }) {
  const missingRequiredRelation = entity.fields
    .filter((field) => !field.readOnly && field.relationKey && !field.optional)
    .some((field) => !(lookups[field.relationKey] ?? []).length);

  return `
    <form class="panel form-panel" data-form>
      <h2>Novo registro</h2>
      ${entity.fields
        .filter((field) => !field.readOnly)
        .map((field) => {
          const required = field.optional ? "" : "required";
          if (field.relationKey) {
            return relationSelect({ field, options: lookups[field.relationKey] ?? [], required });
          }

          if (field.type === "select") {
            return `
              <label>
                ${field.label}
                <select name="${field.name}" ${required}>
                  ${field.options.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}
                </select>
              </label>
            `;
          }

          return `
            <label>
              ${field.label}
              <input name="${field.name}" type="${field.type}" ${required} />
            </label>
          `;
        })
        .join("")}
      <button class="primary-button" type="submit" ${missingRequiredRelation ? "disabled" : ""}>Salvar</button>
    </form>
  `;
}
