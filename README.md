# Sistema de Colas con BullMQ

Sistema de procesamiento de emails en segundo plano usando colas con BullMQ y Redis, construido con Node.js y Express.

## Tecnologías

- **Node.js** + **Express** — Servidor
- **BullMQ** — Sistema de colas
- **Redis (Upstash)** — Base de datos en memoria para las colas
- **Nodemailer** — Envío de emails
- **Ethereal Email** — Servidor SMTP de pruebas

## Características

- Agregar emails a una cola de procesamiento
- Worker que procesa jobs en segundo plano
- Consultar estado de cualquier job
- Reintentos automáticos en caso de fallo
- Preview de emails enviados con Ethereal

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/emails/send | Agregar email a la cola |
| GET | /api/emails/status/:id | Ver estado de un job |

## Instalación

1. Clona el repositorio
\```bash
git clone https://github.com/JasonOspina07/sistema-colas.git
cd sistema-colas
\```

2. Instala las dependencias
\```bash
npm install
\```

3. Configura las variables de entorno
\```
PORT=3003
REDIS_URL=rediss://default:PASSWORD@host.upstash.io:6379
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password
\```

4. Inicia el servidor
\```bash
npm run dev
\```

## Uso

### Enviar email a la cola
\```json
POST /api/emails/send
{
  "to": "destinatario@gmail.com",
  "subject": "Asunto del email",
  "message": "Contenido del mensaje"
}
\```

### Ver estado del job
\```
GET /api/emails/status/1
\```