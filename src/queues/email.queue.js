const { Queue } = require('bullmq')
const dotenv = require('dotenv')
dotenv.config()

const { connection } = require('./connection')

const emailQueue = new Queue('emails', { connection })

module.exports = emailQueue