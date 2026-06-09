const now = "2026-05-30T16:20";

export const mockDatabase = {
  users: [
    { id: 1, name: "Isaias Souza", email: "isaias@email.com", profileId: 1, profile: { id: 1, name: "ADMIN" } },
    { id: 2, name: "Marina Lima", email: "marina@email.com", profileId: 2, profile: { id: 2, name: "MORADOR" } }
  ],
  profiles: [
    { id: 1, name: "ADMIN", description: "Acesso total", canControlDevices: true, canEditStructure: true, canViewLogs: true },
    { id: 2, name: "MORADOR", description: "Uso residencial", canControlDevices: true, canEditStructure: false, canViewLogs: true }
  ],
  homes: [
    { id: 1, name: "Casa Principal", address: "Rua das Palmeiras, 120", userId: 1, user: { id: 1, name: "Isaias Souza" } }
  ],
  rooms: [
    { id: 1, name: "Sala", type: "SALA", houseId: 1, house: { id: 1, name: "Casa Principal" } },
    { id: 2, name: "Cozinha", type: "COZINHA", houseId: 1, house: { id: 1, name: "Casa Principal" } }
  ],
  devices: [
    { id: 1, name: "ESP32 Cozinha", deviceTypeId: 1, topic: "casa/cozinha/esp32", status: "ON", roomId: 2 },
    { id: 2, name: "Luz da Sala", deviceTypeId: 2, topic: "casa/sala/luz", status: "OFF", roomId: 1 }
  ],
  deviceTypes: [
    { id: 1, name: "Sensor MQ-2", manufacturer: "Hanwei", unit: "ppm" },
    { id: 2, name: "Rele Wi-Fi", manufacturer: "Sonoff", unit: null }
  ],
  sensors: [
    { id: 1, name: "Temperatura Sala", mqttTopic: "casa/sala/temperatura", deviceTypeId: 1, roomId: 1 },
    { id: 2, name: "Luminosidade Cozinha", mqttTopic: "casa/cozinha/luminosidade", deviceTypeId: 1, roomId: 2 }
  ],
  sensorReadings: [
    { id: 1, value: "26.4", sensorId: 1, timestamp: now },
    { id: 2, value: "118", sensorId: 2, timestamp: now }
  ],
  alerts: [
    { id: 1, message: "Temperatura alta detectada", alertTypeId: 1, sensorId: 1, deviceId: "" }
  ],
  alertTypes: [
    { id: 1, name: "Temperatura alta", description: "Leitura acima do limite seguro" },
    { id: 2, name: "Movimento", description: "Movimento em area monitorada" }
  ],
  automationRules: [
    { id: 1, name: "Ventilar sala", condition: "temperature > 30", enabled: true, actionId: 1 }
  ],
  actions: [
    { id: 1, name: "Ligar luz", deviceId: 2, command: "ON" }
  ],
  notifications: [
    { id: 1, message: "Alerta de temperatura", userId: 1, timestamp: now, read: false }
  ],
  eventLogs: [
    { id: 1, eventType: "MQTT", message: "Mensagem recebida em casa/cozinha/luminosidade", userId: 1, timestamp: now }
  ]
};
