const fs = require("fs");

const whatsappModel = require("../shared/whatsappModels");

const requestQueue = require("../models/requestQueue");
const redisClient = require("../models/redisClient");

async function Process(textUser, number){ 
    textUser = textUser.toLowerCase();
    var models = [];    

    var modelsant = await redisClient.get(`flujo:${number}`)
    modelsant = (modelsant == null) ? [] : JSON.parse(modelsant);

    console.log(modelsant)

    if(modelsant.length==0){
        var model = whatsappModel.MessageText("Hola, bienvenido al asistente de compra Productos Tostados La Nena!!",number);
        models.push(model);        

        await redisClient.set(`flujo:${number}`,JSON.stringify([...modelsant,"bienvenida"]));
        console.log([...modelsant,"bienvenida"])
    }else if(modelsant.length==1){
        var model = whatsappModel.MessageText("Así le gusta a la gente!!",number);
        models.push(model);        

        //await redisClient.set(`flujo:${number}`,JSON.stringify([...modelsant,"agradecimiento"]));
        await redisClient.del(`flujo:${number}`);

    }

    

    

    /*if(textUser.includes("hola")){
        //Saludar
        var model = whatsappModel.MessageText("Hola, un gusto saludarte!!",number);
        models.push(model);

        var modelf = whatsappModel.MessageText("Vuelve a indicar tu requerimiento",number);
        models.push(modelf);        

        var modelf2 = whatsappModel.MessageText("Este debe ser último",number);
        models.push(modelf2);
    }else if(textUser.includes("gracias")){
        //Agradecimiento
        var model = whatsappModel.MessageText("Gracias a ti por escribir!!",number);
        models.push(model);
    }else if(textUser.includes("adios") ||
        textUser.includes("adiós") ||
        textUser.includes("bye") ||
        textUser.includes("me voy") ||
        textUser.includes("hasta pronto")){
        //Agradecimiento
        var model = whatsappModel.MessageText("Nos hablamos luego!!",number);
        models.push(model);
    }else{
        var model = whatsappModel.MessageText("No entiendo lo que dices",number);
        models.push(model);
    }*/

    /*

    await redisClient.set(`flujo:${number}`,[...modelsant,models]);*/
    
    var delay = (models.length > 1) ? 100 : 0;

    models.forEach(model => {
        var messageObject = {"type":"out","content":model,"delay":delay};        
        Promise.resolve(agrega_cola(messageObject));        
    });    
    
}
async function agrega_cola(messageObject){
    const job = await requestQueue.add(messageObject);
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
            console.log("Sin mensaje")
        }

    }else{
        console.log("Sin mensaje")
    }
    return text;
}

module.exports = {
    Process,
    GetTextUser
}