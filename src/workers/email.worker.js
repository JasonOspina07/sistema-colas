const { Worker } = require('bullmq')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const { connection } = require('../queues/connection')

/* Transporter de prueba con Ethereal*/
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ethereal_user',
        pass: 'ethereal_pass'
    }
})

/* Worker que procesa los jobs*/
const emailWorker = new Worker('emails', async (job) => {
    console.log(`Procesando job: ${job.id}`)
    console.log(`Enviando email a: ${job.data.to}`)

    /* Crear cuenta de prueba automáticamente*/
    const testAccount = await nodemailer.createTestAccount()

    const testTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    const info = await testTransporter.sendMail({
        from: testAccount.user,
        to: job.data.to,
        subject: job.data.subject,
        html: job.data.html
    })

    console.log(`Email enviado: ${nodemailer.getTestMessageUrl(info)}`)
    return { success: true, url: nodemailer.getTestMessageUrl(info) }

}, { connection })

emailWorker.on('completed', (job, result) => {
    console.log(` Job ${job.id} completado`)
    console.log(` Ver email: ${result.url}`)
})

emailWorker.on('failed', (job, error) => {
    console.log(` Job ${job.id} falló: ${error.message}`)
})

module.exports = emailWorker