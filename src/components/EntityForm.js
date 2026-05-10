export function EntityForm({ entity }) {
  return `
    <form class="panel form-panel" data-form>
      <h2>Novo registro</h2>
      ${entity.fields
        .map((field) => {
          if (field.type === "select") {
            return `
              <label>
                ${field.label}
                <select name="${field.name}" required>
                  ${field.options.map((option) => `<option>${option}</option>`).join("")}
                </select>
              </label>
            `;
          }

          return `
            <label>
              ${field.label}
              <input name="${field.name}" type="${field.type}" required />
            </label>
          `;
        })
        .join("")}
      <button class="primary-button" type="submit">Salvar</button>
    </form>
  `;
}
