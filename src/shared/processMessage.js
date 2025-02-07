const whatsappModel = require("../shared/whatsappModels");
const whatsappService = require("../services/whatsappService");

function Process(textUser, number){
    textUser = textUser.toLowerCase();
    var models = [];

    if(textUser.includes("hola")){
        //Saludar
        var model = whatsappModel.MessageText("Hola, un gusto saludarte!!",number);
        models.push(model);
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
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsApp(model)
    })
}

module.exports = {
    Process
}