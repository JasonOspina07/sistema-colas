const express = require('express')
const router = express.Router()
const { sendEmail, getJobStatus } = require('../controllers/email.controller')

router.post('/send', sendEmail)
router.get('/status/:id', getJobStatus)

module.exports = router