export const entityGroups = [
  {
    title: "Usuarios",
    note: "Cadastro, login e controle de acesso",
    entities: [
      {
        key: "users",
        label: "Usuario",
        endpoint: "/users",
        createEndpoint: "/users/register",
        fields: [
          { name: "name", label: "Nome", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Senha", type: "password", hideInTable: true },
          { name: "profileId", label: "ID do Perfil", type: "number" }
        ]
      },
      {
        key: "profiles",
        label: "Perfil/Permissoes",
        endpoint: "/profiles",
        updateMethod: "PUT",
        fields: [
          { name: "name", label: "Perfil", type: "text" },
          { name: "description", label: "Descricao", type: "text" },
          { name: "canControlDevices", label: "Controla dispositivos", type: "select", options: ["true", "false"] },
          { name: "canEditStructure", label: "Edita estrutura", type: "select", options: ["true", "false"] },
          { name: "canViewLogs", label: "Visualiza logs", type: "select", options: ["true", "false"] }
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
        endpoint: "/houses",
        fields: [
          { name: "name", label: "Casa", type: "text" },
          { name: "address", label: "Endereco", type: "text" },
          { name: "userId", label: "ID do Usuario", type: "number" }
        ]
      },
      {
        key: "rooms",
        label: "Comodo",
        endpoint: "/rooms",
        fields: [
          { name: "name", label: "Comodo", type: "text" },
          { name: "type", label: "Tipo", type: "select", options: ["SALA", "COZINHA", "QUARTO", "BANHEIRO", "GARAGEM"] },
          { name: "houseId", label: "ID da Casa", type: "number" }
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
        endpoint: "/devices",
        updateMethod: "PATCH_STATUS",
        fields: [
          { name: "name", label: "Dispositivo", type: "text" },
          { name: "deviceTypeId", label: "ID do Tipo", type: "number" },
          { name: "topic", label: "Topico MQTT", type: "text" },
          { name: "status", label: "Status", type: "select", options: ["ON", "OFF"] },
          { name: "roomId", label: "ID do Comodo", type: "number" }
        ]
      },
      {
        key: "deviceTypes",
        label: "Tipo de Dispositivo",
        endpoint: "/device-types",
        fields: [
          { name: "name", label: "Tipo", type: "text" },
          { name: "manufacturer", label: "Fabricante", type: "text" },
          { name: "unit", label: "Unidade", type: "text" }
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
        endpoint: "/sensors",
        fields: [
          { name: "name", label: "Sensor", type: "text" },
          { name: "mqttTopic", label: "Topico MQTT", type: "text" },
          { name: "deviceTypeId", label: "ID do Tipo", type: "number" },
          { name: "roomId", label: "ID do Comodo", type: "number" }
        ]
      },
      {
        key: "sensorReadings",
        label: "Leitura de Sensor",
        endpoint: "/sensor-history/sensor/1",
        createEndpoint: "/sensor-history",
        fields: [
          { name: "value", label: "Valor", type: "number" },
          { name: "sensorId", label: "ID do Sensor", type: "number" },
          { name: "timestamp", label: "Coletado em", type: "datetime-local", readOnly: true }
        ]
      }
    ]
  },
  {
    title: "Alertas",
    note: "Movimento, temperatura alta e eventos da casa",
    entities: [
      {
        key: "alerts",
        label: "Alerta",
        endpoint: "/alerts",
        fields: [
          { name: "message", label: "Mensagem", type: "text" },
          { name: "alertTypeId", label: "ID do Tipo", type: "number" },
          { name: "sensorId", label: "ID do Sensor", type: "number", optional: true },
          { name: "deviceId", label: "ID do Dispositivo", type: "number", optional: true }
        ]
      },
      {
        key: "alertTypes",
        label: "Tipo de Alerta",
        endpoint: "/alert-types",
        fields: [
          { name: "name", label: "Tipo", type: "text" },
          { name: "description", label: "Descricao", type: "text" }
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
        endpoint: "/automation-rules",
        fields: [
          { name: "name", label: "Regra", type: "text" },
          { name: "condition", label: "Condicao", type: "text" },
          { name: "enabled", label: "Ativa", type: "select", options: ["true", "false"] },
          { name: "actionId", label: "ID da Acao", type: "number" }
        ]
      },
      {
        key: "actions",
        label: "Acao",
        endpoint: "/actions",
        fields: [
          { name: "name", label: "Acao", type: "text" },
          { name: "deviceId", label: "ID do Dispositivo", type: "number" },
          { name: "command", label: "Comando", type: "select", options: ["ON", "OFF", "SET:25"] }
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
        endpoint: "/notifications",
        fields: [
          { name: "message", label: "Mensagem", type: "text" },
          { name: "userId", label: "ID do Usuario", type: "number" }
        ]
      },
      {
        key: "eventLogs",
        label: "Log de Eventos",
        endpoint: "/event-logs",
        fields: [
          { name: "eventType", label: "Tipo", type: "text" },
          { name: "message", label: "Mensagem", type: "text" },
          { name: "userId", label: "ID do Usuario", type: "number" },
          { name: "timestamp", label: "Criado em", type: "datetime-local", readOnly: true }
        ]
      }
    ]
  }
];

export const entities = entityGroups.flatMap((group) =>
  group.entities.map((entity) => ({ ...entity, groupTitle: group.title, groupNote: group.note }))
);
