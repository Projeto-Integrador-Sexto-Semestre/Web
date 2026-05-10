const now = "2026-05-09T21:30";

export const mockDatabase = {
  users: [
    { id: 1, nome: "Isaias Souza", email: "isaias@email.com", status: "Ativo", perfil: "Admin" },
    { id: 2, nome: "Marina Lima", email: "marina@email.com", status: "Ativo", perfil: "Morador" }
  ],
  profiles: [
    { id: 1, nome: "Admin", nivel: "Administrador", permissoes: "CRUD total", status: "Ativo" },
    { id: 2, nome: "Visitante", nivel: "Leitura", permissoes: "Somente consulta", status: "Ativo" }
  ],
  homes: [
    { id: 1, nome: "Casa Principal", endereco: "Rua das Palmeiras, 120", responsavel: "Isaias", status: "Monitorada" }
  ],
  rooms: [
    { id: 1, nome: "Sala", casa: "Casa Principal", andar: 1, status: "Ativo" },
    { id: 2, nome: "Cozinha", casa: "Casa Principal", andar: 1, status: "Ativo" }
  ],
  devices: [
    { id: 1, nome: "ESP32 Cozinha", tipo: "Sensor", comodo: "Cozinha", status: "Online" },
    { id: 2, nome: "Luz da Sala", tipo: "Lampada", comodo: "Sala", status: "Online" }
  ],
  deviceTypes: [
    { id: 1, nome: "Sensor MQ-2", categoria: "Sensor", protocolo: "MQTT", status: "Ativo" },
    { id: 2, nome: "Rele Wi-Fi", categoria: "Atuador", protocolo: "MQTT", status: "Ativo" }
  ],
  sensors: [
    { id: 1, nome: "Temperatura Sala", tipo: "Temperatura", topico: "home/sala/temperatura", status: "Online" },
    { id: 2, nome: "Gas Cozinha", tipo: "Gas", topico: "home/cozinha/gas", status: "Online" }
  ],
  sensorReadings: [
    { id: 1, sensor: "Temperatura Sala", valor: 26.4, unidade: "C", coletadoEm: now },
    { id: 2, sensor: "Gas Cozinha", valor: 118, unidade: "ppm", coletadoEm: now }
  ],
  alerts: [
    { id: 1, titulo: "Temperatura acima do limite", tipo: "Temperatura", prioridade: "Media", status: "Aberto" }
  ],
  alertTypes: [
    { id: 1, nome: "Gas detectado", descricao: "Leitura acima do limite seguro", severidade: "Emergencia", status: "Ativo" },
    { id: 2, nome: "Movimento", descricao: "Movimento em area monitorada", severidade: "Atencao", status: "Ativo" }
  ],
  automationRules: [
    { id: 1, nome: "Ventilar sala", condicao: "temperatura > 30", acao: "ligar ventilador", status: "Ativa" }
  ],
  actions: [
    { id: 1, nome: "Ligar luz", dispositivo: "Luz da Sala", comando: "Ligar", status: "Disponivel" }
  ],
  notifications: [
    { id: 1, titulo: "Alerta de temperatura", destinatario: "Isaias", canal: "App", status: "Enviada" }
  ],
  eventLogs: [
    { id: 1, origem: "MQTT", evento: "Mensagem recebida em home/cozinha/gas", nivel: "Info", criadoEm: now }
  ]
};
