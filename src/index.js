const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

/* Middlewares*/
app.use(cors())
app.use(express.json())

/* Iniciar worker */
require('./workers/email.worker')

/* Rutas */
const emailRoutes = require('./routes/email.routes')
app.use('/api/emails', emailRoutes)

/* Ruta de prueba*/
app.get('/', (req, res) => {
    res.json({ 
        message: 'Sistema de colas funcionando',
        version: '1.0.0'
    })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})