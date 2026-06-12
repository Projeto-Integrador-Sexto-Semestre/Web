# PI Smart Home - Web

## Informações do Projeto

**Nome do Projeto:** SMARTHOME

**Integrantes do Projeto:**
- Victor Daniel Araújo Silva
- Gustavo Henrique Santana dos Santos
- Camille Alves Cruz
- Lucas Garcia Lima
- Raphael Micucci Bomfim
- Isaías Belarmina de Souza

**Tema Escolhido:** Sistema de Monitoramento de Casa Inteligente (Smart Home)

## Descrição do Problema Resolvido

Atualmente, muitas residências possuem dispositivos inteligentes e sensores capazes de coletar informações sobre o ambiente, porém essas informações nem sempre ficam centralizadas em uma única plataforma, dificultando o monitoramento e o gerenciamento dos dispositivos. Este projeto propõe uma plataforma unificada para monitorar dispositivos e sensores, permitindo o acompanhamento em tempo real, o gerenciamento dos equipamentos e o recebimento de alertas quando eventos importantes forem detectados.

## Divisão de Responsabilidades

| Integrante | Responsabilidade |
|---|---|
| Victor Daniel Araújo Silva | Backend API |
| Camille Alves Cruz | Backend API e Testes Unitários |
| Lucas Garcia Lima | IoT e JWT (API) |
| Isaías Belarmina de Souza | Mobile e Web |
| Gustavo Henrique Santana dos Santos | Testes |
| Raphael Micucci Bomfim | Documentação |

---

## Visão Geral

Frontend web do projeto **PI Smart Home**, criado com Vite e JavaScript modular. A aplicação oferece login/cadastro, dashboard de monitoramento e telas de CRUD para os principais recursos do sistema de casa inteligente.

- tela de autenticação com login e cadastro;
- dashboard com status de sensores e dispositivos;
- navegação por grupos de entidades;
- formulários dinâmicos para cadastro;
- tabelas de listagem, exclusão e algumas atualizações;
- integração REST configurável;
- fallback automático para mocks locais.

## Tecnologias

- Vite 6
- JavaScript ES Modules
- HTML e CSS puros
- Fetch API
- LocalStorage para sessão local

## Estrutura

```text
.
|-- index.html
|-- package.json
|-- vite.config.js
|-- src
|   |-- main.js
|   |-- components
|   |   |-- App.js
|   |   |-- AuthView.js
|   |   |-- CrudView.js
|   |   |-- Dashboard.js
|   |   |-- DataTable.js
|   |   |-- EntityForm.js
|   |   |-- IotPanel.js
|   |   `-- Sidebar.js
|   |-- data
|   |   |-- entities.js
|   |   `-- mockData.js
|   |-- services
|   |   |-- mockApi.js
|   |   `-- restClient.js
|   `-- styles
|       |-- base.css
|       |-- components.css
|       `-- layout.css
`-- tests
    `-- smart-home-use-case.test.mjs
```

## Como Rodar

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://127.0.0.1:5173
```

Para gerar build de produção:

```bash
npm run build
```

Para visualizar o build:

```bash
npm run preview
```

## Configuração da API

O cliente REST usa a variável `VITE_API_BASE_URL`. Se ela não for definida, o frontend usa `/backend` como base:

```js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/backend";
```

Exemplo de arquivo `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Variáveis de Ambiente Necessárias

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_BASE_URL` | URL base da API Backend | `http://localhost:8080` |

Se não estiver definida, a aplicação usa `/backend` como fallback.

## Exemplos de Usuários/Senhas para Teste

**Usuários Padrão (para testes):**

| Email | Senha | Propósito |
|---|---|---|
| `usuario@teste.com` | `Teste@123` | Teste básico |
| `admin@teste.com` | `Admin@123` | Teste com privilégios |

**Nota:** Criar novos usuários através da interface clicando em "Criar conta". As credenciais acima são exemplos; use valores seguros em produção.

**Padrão de Senha Recomendado:**
- Mínimo 8 caracteres
- Incluir maiúsculas, minúsculas, números e caracteres especiais

## Autenticação

A tela inicial alterna entre:

- `Entrar`, usando `POST /users/login`;
- `Criar conta`, usando `POST /users/register`.

O usuário retornado é salvo em `localStorage` como `smartHomeUser`. O cliente REST também tenta enviar um token salvo como `jwtToken` no header:

```text
Authorization: Bearer <token>
```

## Modo Mock e Fallback

A aplicação tenta usar a API real primeiro. Se a chamada falhar, mostra um aviso e carrega dados locais por `mockApi.js`.

Isso permite demonstrar as telas mesmo sem backend ativo.

## Módulos e Entidades

As telas de CRUD são geradas a partir de `src/data/entities.js`.

| Grupo | Entidades |
|---|---|
| Usuários | Usuário, Perfil/Permissões |
| Casas | Casa, Cômodo |
| Dispositivos | Dispositivo IoT, Tipo de Dispositivo |
| Sensores | Sensor, Leitura de Sensor |
| Alertas | Alerta, Tipo de Alerta |
| Automação | Regra de Automação, Ação |
| Monitoramento | Notificação, Log de Eventos |

## Endpoints Consumidos

| Recurso | Endpoint |
|---|---|
| Login | `POST /users/login` |
| Cadastro | `POST /users/register` |
| Usuários | `/users` |
| Perfis | `/profiles` |
| Casas | `/houses` |
| Cômodos | `/rooms` |
| Dispositivos | `/devices` |
| Tipos de dispositivo | `/device-types` |
| Sensores | `/sensors` |
| Histórico de sensores | `/sensor-history/sensor/1` e `POST /sensor-history` |
| Alertas | `/alerts` |
| Tipos de alerta | `/alert-types` |
| Regras de automação | `/automation-rules` |
| Ações | `/actions` |
| Notificações | `/notifications` |
| Logs de evento | `/event-logs` |

Algumas entidades também possuem operações específicas:

- `PUT /profiles/{id}` para editar perfis;
- `PATCH /devices/{id}/status` para alternar status de dispositivos.

## Dashboard

O dashboard busca uma fotografia do sistema por meio de `restApi.mqttSnapshot()`. Internamente, ele consulta:

- `/devices`;
- `/sensors`;
- `/sensor-history/sensor/{sensorId}`.

Com isso, monta cards de temperatura, luminosidade, movimento, dispositivo e tópico monitorado.

## Integração com Backend e IoT

O fluxo esperado entre os repositórios é:

```text
ESP32 -> MQTT -> Backend -> API REST -> Web
```

O frontend não conversa diretamente com o ESP32. Ele consome o backend, que por sua vez centraliza persistência, autenticação e comandos MQTT.

## Testes

O repositório possui um teste de caso de uso em:

```text
tests/smart-home-use-case.test.mjs
```

Caso o script não esteja exposto no `package.json`, ele pode ser executado diretamente com Node em ambientes configurados:

```bash
node tests/smart-home-use-case.test.mjs
```

## Observações para Evolução

- Persistir corretamente o token JWT retornado pelo backend como `jwtToken`, caso a API passe a exigir autenticação em todas as rotas.
- Substituir endpoints mockados por contratos definitivos sempre que o backend evoluir.
- Adicionar scripts de teste no `package.json` para padronizar validação automatizada.
