const emailQueue = require('../queues/email.queue')

// Agregar email a la cola
const sendEmail = async (req, res) => {
    try {
        const { to, subject, message } = req.body

        if (!to || !subject || !message) {
            return res.status(400).json({ 
                message: 'Los campos to, subject y message son requeridos' 
            })
        }

        // Agregar job a la cola
        const job = await emailQueue.add('send-email', {
            to,
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>${subject}</h2>
                    <p>${message}</p>
                    <hr>
                    <small>Enviado desde Sistema de Colas</small>
                </div>
            `
        })

        res.status(201).json({
            message: 'Email agregado a la cola exitosamente',
            jobId: job.id
        })

    } catch (error) {
        res.status(500).json({ message: 'Error agregando a la cola', error: error.message })
    }
}

// Ver estado de un job
const getJobStatus = async (req, res) => {
    try {
        const { id } = req.params
        const job = await emailQueue.getJob(id)

        if (!job) {
            return res.status(404).json({ message: 'Job no encontrado' })
        }

        const state = await job.getState()

        res.json({
            jobId: job.id,
            state,
            data: job.data,
            createdAt: new Date(job.timestamp)
        })

    } catch (error) {
        res.status(500).json({ message: 'Error obteniendo estado', error: error.message })
    }
}

module.exports = { sendEmail, getJobStatus }