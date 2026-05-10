# PI Smart Home Web

Frontend estatico para demonstrar os 14 CRUDs do projeto, dividido por integrante, com dados mockados e contratos REST preparados.

## Rodar

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:5173`.

## Troca do mock pela API

- Hoje a tela usa `src/services/mockApi.js`.
- Quando o backend Spring Boot estiver pronto, substitua as chamadas pelo `src/services/restClient.js`.
- Endpoints sugeridos ficam definidos em `src/data/entities.js`.
