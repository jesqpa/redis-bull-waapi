const express = require('express');
const router = express.Router();
const whatsAppController = require("../controllers/whatsappController");

router
.get("/", whatsAppController.VerifyToken)
.post("/" , whatsAppController.ReceivedMessage)

module.exports = router;