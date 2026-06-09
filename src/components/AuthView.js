export function AuthView({ mode, loading, error }) {
  const isRegister = mode === "register";

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

          <button class="primary-button" type="submit" ${loading ? "disabled" : ""}>
            ${loading ? "Aguarde" : isRegister ? "Cadastrar" : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  `;
}
