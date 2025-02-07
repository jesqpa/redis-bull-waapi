const requestQueue = require("../models/requestQueue");
const redisClient = require("../models/redisClient");

/*const addJob = async (req, res) => {
    const { jobData } = req.body;
    
    if (!jobData) return res.status(400).json({ error: "Faltan datos" });

    const job = await requestQueue.add(jobData);
    res.json({ message: "Tarea añadida", jobId: job.id });
};*/

const processJob = async (job) => {
    console.log(`Procesando tarea ID: ${job.id}, Datos:`, job.data);

    // Simulación de procesamiento (espera 3 segundos)
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log(`Tarea ${job.id} completada`);
    return { status: "completado" };
};

const onJobCompleted = async (job) => {
    const { data } = job;    
    if(data){        
        console.log(`Trabajo completado, eliminando el registro de Redis para: ${data.mensaje}`);
        // Elimina el trabajo de Redis
        await redisClient.del(`job:${data.mensaje}`);  // Ajusta la clave según lo que almacenes
        console.log(`Registro de Redis eliminado para: ${data.mensaje}`);

        // También elimina el trabajo de la cola si es necesario
        await job.remove();
        console.log(`Trabajo eliminado de la cola`);

        console.log(await redisClient.get("bull:requestQueue:id"))
    }
};

const onJobFailed = (job, err) => {
    console.error(`Error en la tarea ${job.id}:`, err);
};

module.exports = {
    /*addJob,*/
    processJob,
    onJobCompleted,
    onJobFailed
};