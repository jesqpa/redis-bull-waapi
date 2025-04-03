require("dotenv").config();

const requestQueue = require("./models/requestQueue");
const { processJob, onJobCompleted, onJobFailed } = require("./controllers/jobController");

const express = require('express');

const apiRoute = require("./routes/routes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/whatsapp", apiRoute);


// Procesar la cola
requestQueue.process(processJob);
// Event listener para cuando el trabajo se complete
requestQueue.on("completed", onJobCompleted);
// Manejo de errores
requestQueue.on("failed", onJobFailed);

app.listen(PORT, () => {console.log("el puerto es " + PORT)});