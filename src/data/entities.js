export const entityGroups = [
  {
    title: "Usuarios",
    note: "Login, JWT e controle de acesso",
    entities: [
      {
        key: "users",
        label: "Usuario",
        endpoint: "/api/users",
        fields: [
          { name: "nome", label: "Nome", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "status", label: "Status", type: "select", options: ["Ativo", "Bloqueado", "Pendente"] },
          { name: "perfil", label: "Perfil", type: "select", options: ["Admin", "Morador", "Visitante"] }
        ]
      },
      {
        key: "profiles",
        label: "Perfil/Permissoes",
        endpoint: "/api/profiles",
        fields: [
          { name: "nome", label: "Perfil", type: "text" },
          { name: "nivel", label: "Nivel", type: "select", options: ["Administrador", "Operador", "Leitura"] },
          { name: "permissoes", label: "Permissoes", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["Ativo", "Inativo"] }
        ]
      }
    ]
  },
  {
    title: "Casas",
    note: "Estrutura fisica do sistema",
    entities: [
      {
        key: "homes",
        label: "Casa",
        endpoint: "/api/homes",
        fields: [
          { name: "nome", label: "Casa", type: "text" },
          { name: "endereco", label: "Endereco", type: "text" },
          { name: "responsavel", label: "Responsavel", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["Monitorada", "Manutencao", "Offline"] }
        ]
      },
      {
        key: "rooms",
        label: "Comodo",
        endpoint: "/api/rooms",
        fields: [
          { name: "nome", label: "Comodo", type: "text" },
          { name: "casa", label: "Casa", type: "text" },
          { name: "andar", label: "Andar", type: "number" },
          { name: "status", label: "Status", type: "select", options: ["Ativo", "Inativo"] }
        ]
      }
    ]
  },
  {
    title: "Dispositivos",
    note: "Lampada, sensor, camera e outros dispositivos IoT",
    entities: [
      {
        key: "devices",
        label: "Dispositivo IoT",
        endpoint: "/api/devices",
        fields: [
          { name: "nome", label: "Dispositivo", type: "text" },
          { name: "tipo", label: "Tipo", type: "select", options: ["Sensor", "Lampada", "Camera", "Atuador"] },
          { name: "comodo", label: "Comodo", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["Online", "Offline", "Manutencao"] }
        ]
      },
      {
        key: "deviceTypes",
        label: "Tipo de Dispositivo",
        endpoint: "/api/device-types",
        fields: [
          { name: "nome", label: "Tipo", type: "text" },
          { name: "categoria", label: "Categoria", type: "select", options: ["Sensor", "Atuador", "Seguranca"] },
          { name: "protocolo", label: "Protocolo", type: "select", options: ["MQTT", "HTTP", "Bluetooth"] },
          { name: "status", label: "Status", type: "select", options: ["Ativo", "Inativo"] }
        ]
      }
    ]
  },
  {
    title: "Sensores",
    note: "MQTT salva leituras no historico",
    entities: [
      {
        key: "sensors",
        label: "Sensor",
        endpoint: "/api/sensors",
        fields: [
          { name: "nome", label: "Sensor", type: "text" },
          { name: "tipo", label: "Tipo", type: "select", options: ["Temperatura", "Gas", "Movimento", "Umidade"] },
          { name: "topico", label: "Topico MQTT", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["Online", "Offline"] }
        ]
      },
      {
        key: "sensorReadings",
        label: "Leitura de Sensor",
        endpoint: "/api/sensor-readings",
        fields: [
          { name: "sensor", label: "Sensor", type: "text" },
          { name: "valor", label: "Valor", type: "number" },
          { name: "unidade", label: "Unidade", type: "text" },
          { name: "coletadoEm", label: "Coletado em", type: "datetime-local" }
        ]
      }
    ]
  },
  {
    title: "Alertas",
    note: "Gas detectado, movimento e temperatura alta",
    entities: [
      {
        key: "alerts",
        label: "Alerta",
        endpoint: "/api/alerts",
        fields: [
          { name: "titulo", label: "Titulo", type: "text" },
          { name: "tipo", label: "Tipo", type: "select", options: ["Gas", "Movimento", "Temperatura"] },
          { name: "prioridade", label: "Prioridade", type: "select", options: ["Baixa", "Media", "Alta", "Critica"] },
          { name: "status", label: "Status", type: "select", options: ["Aberto", "Resolvido"] }
        ]
      },
      {
        key: "alertTypes",
        label: "Tipo de Alerta",
        endpoint: "/api/alert-types",
        fields: [
          { name: "nome", label: "Tipo", type: "text" },
          { name: "descricao", label: "Descricao", type: "text" },
          { name: "severidade", label: "Severidade", type: "select", options: ["Informativo", "Atencao", "Emergencia"] },
          { name: "status", label: "Status", type: "select", options: ["Ativo", "Inativo"] }
        ]
      }
    ]
  },
  {
    title: "Automacao",
    note: "Regras e acoes automatizadas",
    entities: [
      {
        key: "automationRules",
        label: "Regra de Automacao",
        endpoint: "/api/automation-rules",
        fields: [
          { name: "nome", label: "Regra", type: "text" },
          { name: "condicao", label: "Condicao", type: "text" },
          { name: "acao", label: "Acao", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["Ativa", "Pausada"] }
        ]
      },
      {
        key: "actions",
        label: "Acao",
        endpoint: "/api/actions",
        fields: [
          { name: "nome", label: "Acao", type: "text" },
          { name: "dispositivo", label: "Dispositivo", type: "text" },
          { name: "comando", label: "Comando", type: "select", options: ["Ligar", "Desligar", "Notificar", "Bloquear"] },
          { name: "status", label: "Status", type: "select", options: ["Disponivel", "Indisponivel"] }
        ]
      }
    ]
  },
  {
    title: "Monitoramento",
    note: "Notificacoes e logs do sistema",
    entities: [
      {
        key: "notifications",
        label: "Notificacao",
        endpoint: "/api/notifications",
        fields: [
          { name: "titulo", label: "Titulo", type: "text" },
          { name: "destinatario", label: "Destinatario", type: "text" },
          { name: "canal", label: "Canal", type: "select", options: ["App", "Email", "SMS"] },
          { name: "status", label: "Status", type: "select", options: ["Enviada", "Pendente", "Falhou"] }
        ]
      },
      {
        key: "eventLogs",
        label: "Log de Eventos",
        endpoint: "/api/event-logs",
        fields: [
          { name: "origem", label: "Origem", type: "text" },
          { name: "evento", label: "Evento", type: "text" },
          { name: "nivel", label: "Nivel", type: "select", options: ["Info", "Warn", "Erro"] },
          { name: "criadoEm", label: "Criado em", type: "datetime-local" }
        ]
      }
    ]
  }
];

export const entities = entityGroups.flatMap((group) =>
  group.entities.map((entity) => ({ ...entity, groupTitle: group.title, groupNote: group.note }))
);
