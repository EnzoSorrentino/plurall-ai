# Plurall AI

Extensão Chrome para organização e automação autorizada de atividades no Plurall.

## Desenvolvimento

```powershell
npm install
npm run typecheck
npm run build
```

Carregue a pasta de saída no `chrome://extensions` com o modo do desenvolvedor ativado. O adaptador da plataforma fica em `src/content` e o estado das tarefas é salvo localmente.

## IA local

Copie `.env.example` para `server/.env`, preencha `GEMINI_API_KEY` e execute:

```powershell
cd server
npm install
npm run dev
```

O popup consulta `http://localhost:8787/api/explain`. A chave fica somente no servidor e não é empacotada na extensão.
