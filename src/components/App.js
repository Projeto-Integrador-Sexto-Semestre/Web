import { entities, entityGroups } from "../data/entities.js";
import { mockApi } from "../services/mockApi.js";
import { API_BASE_URL, restApi } from "../services/restClient.js";
import { Sidebar } from "./Sidebar.js";
import { Dashboard } from "./Dashboard.js";
import { CrudView } from "./CrudView.js";
import { AuthView } from "./AuthView.js";

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("smartHomeUser"));
  } catch {
    return null;
  }
};

export function createApp(root) {
  const state = {
    currentUser: readStoredUser(),
    authMode: "login",
    authLoading: false,
    authError: "",
    selectedKey: "dashboard",
    rows: [],
    lookups: {},
    mqtt: null,
    loading: false,
    error: ""
  };

  const selectedEntity = () => entities.find((entity) => entity.key === state.selectedKey);
  const relationKeysFor = (entity) => [
    ...new Set(entity?.fields?.map((field) => field.relationKey).filter(Boolean) ?? [])
  ];

  const withFallback = async (realCall, mockCall) => {
    try {
      state.error = "";
      return await realCall();
    } catch (error) {
      console.warn(error);
      state.error = `Servidor indisponivel em ${API_BASE_URL}. Exibindo dados locais.`;
      return mockCall();
    }
  };

  const loadLookups = async (relationKeys) => {
    if (!relationKeys.length) return {};

    const entries = await Promise.all(
      relationKeys.map(async (key) => {
        const entity = entities.find((item) => item.key === key);
        if (!entity) return [key, []];

        try {
          return [key, await restApi.list(entity)];
        } catch (error) {
          console.warn(error);
          return [key, await mockApi.list(key)];
        }
      })
    );

    return Object.fromEntries(entries);
  };

  const setAuthMode = (mode) => {
    state.authMode = mode;
    state.authError = "";
    render();
  };

  const signIn = async (payload) => {
    state.authLoading = true;
    state.authError = "";
    render();
    try {
      const user = await restApi.login(payload);
      if (user?.message) throw new Error(user.message);
      state.currentUser = user;
      state.authLoading = false;
      localStorage.setItem("smartHomeUser", JSON.stringify(user));
      await load();
    } catch (error) {
      state.authError = error.message || "Nao foi possivel entrar.";
      state.authLoading = false;
      render();
    }
  };

  const signUp = async (payload) => {
    state.authLoading = true;
    state.authError = "";
    render();
    try {
      const user = await restApi.register(payload);
      state.currentUser = user;
      state.authLoading = false;
      localStorage.setItem("smartHomeUser", JSON.stringify(user));
      await load();
    } catch (error) {
      state.authError = error.message || "Nao foi possivel cadastrar.";
      state.authLoading = false;
      render();
    }
  };

  const logout = () => {
    localStorage.removeItem("smartHomeUser");
    state.currentUser = null;
    state.selectedKey = "dashboard";
    state.rows = [];
    state.mqtt = null;
    state.error = "";
    state.authMode = "login";
    state.authLoading = false;
    state.authError = "";
    render();
  };

  const select = async (key) => {
    state.selectedKey = key;
    await load();
  };

  const load = async () => {
    state.loading = true;
    render();
    if (state.selectedKey === "dashboard") {
      state.mqtt = await withFallback(() => restApi.mqttSnapshot(), () => mockApi.mqttSnapshot());
    } else {
      const entity = selectedEntity();
      const [rows, lookups] = await Promise.all([
        withFallback(() => restApi.list(entity), () => mockApi.list(state.selectedKey)),
        loadLookups(relationKeysFor(entity))
      ]);
      state.rows = rows;
      state.lookups = { ...state.lookups, ...lookups };
    }
    state.loading = false;
    render();
  };

  const create = async (payload) => {
    const entity = selectedEntity();
    await withFallback(() => restApi.create(entity, payload), () => mockApi.create(state.selectedKey, payload));
    await load();
  };

  const update = async (id, payload) => {
    const entity = selectedEntity();
    await withFallback(() => restApi.update(entity, id, payload), () => mockApi.update(state.selectedKey, id, payload));
    await load();
  };

  const remove = async (id) => {
    const entity = selectedEntity();
    await withFallback(() => restApi.remove(entity, id), () => mockApi.remove(state.selectedKey, id));
    await load();
  };

  const render = () => {
    if (!state.currentUser) {
      root.innerHTML = AuthView({
        mode: state.authMode,
        loading: state.authLoading,
        error: state.authError
      });

      root.querySelectorAll("[data-auth-mode]").forEach((button) => {
        button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
      });

      const authForm = root.querySelector("[data-auth-form]");
      if (authForm) {
        authForm.addEventListener("submit", (event) => {
          event.preventDefault();
          const payload = Object.fromEntries(new FormData(authForm).entries());
          state.authMode === "register" ? signUp(payload) : signIn(payload);
        });
      }
      return;
    }

    const currentEntity = selectedEntity();
    root.innerHTML = `
      <div class="app-shell">
        ${Sidebar({ groups: entityGroups, selectedKey: state.selectedKey, user: state.currentUser })}
        <main class="main-panel">
          ${state.error ? `<div class="api-warning">${state.error}</div>` : ""}
          ${
            state.selectedKey === "dashboard"
              ? Dashboard({ mqtt: state.mqtt })
              : CrudView({ entity: currentEntity, rows: state.rows, loading: state.loading, lookups: state.lookups })
          }
        </main>
      </div>
    `;

    root.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => select(button.dataset.nav));
    });

    root.querySelector("[data-logout]")?.addEventListener("click", logout);

    const form = root.querySelector("[data-form]");
    if (form && currentEntity) {
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
        if (!row || !currentEntity?.updateMethod) return;
        const firstField = currentEntity.updateMethod === "PATCH_STATUS"
          ? "status"
          : currentEntity.fields.find((field) => !field.readOnly && !field.hideInTable)?.name;
        const nextValue = firstField === "status" ? (row.status === "ON" ? "OFF" : "ON") : `${row[firstField] ?? ""} atualizado`;
        const payload = currentEntity.updateMethod === "PUT"
          ? Object.fromEntries(
              currentEntity.fields
                .filter((field) => !field.readOnly && !field.hideInTable)
                .map((field) => [field.name, field.name === firstField ? nextValue : row[field.name]])
            )
          : { [firstField]: nextValue };
        update(row.id, payload);
      });
    });
  };

  state.currentUser ? load() : render();
}
