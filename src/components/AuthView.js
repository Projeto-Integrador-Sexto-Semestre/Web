export function AuthView({ mode, profiles, loading, error }) {
  const isRegister = mode === "register";
  const profileField = profiles.length
    ? `
      <label>
        Perfil
        <select name="profileId" required>
          ${profiles.map((profile) => `<option value="${profile.id}">${profile.name}</option>`).join("")}
        </select>
      </label>
    `
    : `
      <label>
        ID do Perfil
        <input name="profileId" type="number" min="1" value="1" required />
      </label>
    `;

  return `
    <main class="auth-shell">
      <section class="auth-panel">
        <div class="auth-brand">
          <span class="brand-mark">PI</span>
          <div>
            <strong>Smart Home</strong>
            <small>Backend SmartHouse</small>
          </div>
        </div>

        <div class="auth-tabs" role="tablist" aria-label="Acesso">
          <button class="${!isRegister ? "is-active" : ""}" data-auth-mode="login" type="button">Entrar</button>
          <button class="${isRegister ? "is-active" : ""}" data-auth-mode="register" type="button">Criar conta</button>
        </div>

        ${error ? `<div class="auth-error">${error}</div>` : ""}

        <form class="auth-form" data-auth-form>
          ${isRegister ? `
            <label>
              Nome
              <input name="name" type="text" autocomplete="name" required />
            </label>
          ` : ""}

          <label>
            Email
            <input name="email" type="email" autocomplete="email" required />
          </label>

          <label>
            Senha
            <input name="password" type="password" autocomplete="${isRegister ? "new-password" : "current-password"}" required />
          </label>

          ${isRegister ? profileField : ""}

          <button class="primary-button" type="submit" ${loading ? "disabled" : ""}>
            ${loading ? "Aguarde" : isRegister ? "Cadastrar" : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  `;
}
