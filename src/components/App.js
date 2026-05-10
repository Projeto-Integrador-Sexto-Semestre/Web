import { entities, entityGroups } from "../data/entities.js";
import { mockApi } from "../services/mockApi.js";
import { Sidebar } from "./Sidebar.js";
import { Dashboard } from "./Dashboard.js";
import { CrudView } from "./CrudView.js";
import { IotPanel } from "./IotPanel.js";

export function createApp(root) {
  const state = {
    selectedKey: "dashboard",
    rows: [],
    mqtt: null,
    loading: false
  };

  const select = async (key) => {
    state.selectedKey = key;
    await load();
  };

  const load = async () => {
    state.loading = true;
    render();
    if (state.selectedKey === "dashboard") {
      state.mqtt = await mockApi.mqttSnapshot();
    } else {
      state.rows = await mockApi.list(state.selectedKey);
    }
    state.loading = false;
    render();
  };

  const create = async (payload) => {
    await mockApi.create(state.selectedKey, payload);
    await load();
  };

  const update = async (id, payload) => {
    await mockApi.update(state.selectedKey, id, payload);
    await load();
  };

  const remove = async (id) => {
    await mockApi.remove(state.selectedKey, id);
    await load();
  };

  const render = () => {
    const selectedEntity = entities.find((entity) => entity.key === state.selectedKey);
    root.innerHTML = `
      <div class="app-shell">
        ${Sidebar({ groups: entityGroups, selectedKey: state.selectedKey })}
        <main class="main-panel">
          ${
            state.selectedKey === "dashboard"
              ? `${Dashboard({ groups: entityGroups })}${IotPanel({ mqtt: state.mqtt })}`
              : CrudView({ entity: selectedEntity, rows: state.rows, loading: state.loading })
          }
        </main>
      </div>
    `;

    root.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => select(button.dataset.nav));
    });

    const form = root.querySelector("[data-form]");
    if (form && selectedEntity) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        create(data);
        form.reset();
      });
    }

    root.querySelectorAll("[data-delete]").forEach((button) => {
      button.addEventListener("click", () => remove(button.dataset.delete));
    });

    root.querySelectorAll("[data-update]").forEach((button) => {
      button.addEventListener("click", () => {
        const row = state.rows.find((item) => item.id === Number(button.dataset.update));
        const firstField = selectedEntity.fields[0].name;
        update(row.id, { [firstField]: `${row[firstField]} atualizado` });
      });
    });
  };

  load();
}
