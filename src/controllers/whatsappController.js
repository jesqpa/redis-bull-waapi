const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"))

const processMessage = require("../shared/processMessage")

const requestQueue = require("../models/requestQueue");
const redisClient = require("../models/redisClient");

const VerifyToken = (req,res) => {

    try {
        var accessToken = "GGFG7D8787G8DF7GDF8GD787GDFG";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        if (challenge != null && token!=null && token == accessToken){
            res.send(challenge)
        }else{
            res.status(400).send();
        }

    } catch (e) {
        res.status(400).send();
    }
}

const ReceivedMessage = async(req,res) => {
    
    try {
        

        var entry = (req.body["entry"])[0];
        var id = entry["id"];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];
        //var statusesObject = value["statuses"];

        const job = await requestQueue.add(messageObject);
        
        console.log({ message: "Tarea añadida", jobId: job.id });
        
        /*
        if(typeof statusesObject != "undefined"){
            //----Para procesar los estados sent y read
        }else if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var text = GetTextUser(messages);
            var number = messages["from"];
                      

            if(text!=""){
                processMessage.Process(text,number)
                
            }
            


        }*/

        

        res.send("EVENT_RECEIVED");
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages){
    var text = "";
    var typeMessage=messages["type"];

    if(typeMessage == "text"){
        text = (messages["text"]["body"]);
    }else if(typeMessage == "interactive"){
        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        
        if(typeInteractive == "button_reply"){
            text = (interactiveObject["button_reply"])["title"]
        }else if(typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"]
        }else{
            myConsole.log("Sin mensaje")
        }

    }else{
        myConsole.log("Sin mensaje")
    }
    return text;
}

/*const processJob = async (job) => {
    console.log(`Procesando tarea ID: ${job.id}, Datos:`, job.data);

    // Simulación de procesamiento (espera 3 segundos)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log(`Tarea ${job.id} completada`);
    return { status: "completado" };
};

const onJobCompleted = async (job) => {
    const { data } = job;    console.log(105);console.log(data)
    if(data && false){        
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
};*/

module.exports = { 
    VerifyToken, 
    ReceivedMessage/*,
    processJob,
    onJobCompleted,
    onJobFailed */
}