const fs = require("fs");

const requestQueue = require("../models/requestQueue");
const {Logger} = require("../shared/loggerService");

const VerifyToken = (req,res) => {

    try {
        var accessToken = process.env.WAP_ACCESS_TOKEN;
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
        var line_number = changes.value.metadata.phone_number_id;

        
        
        var statusesObject = value["statuses"];
        var messageObject = {id,"type":"in",line_number,"content":value["messages"]};
        
        if(typeof statusesObject != "undefined"){
            //----Para procesar los estados sent y read
        }else if(typeof messageObject != "undefined"){ 

            console.log("****************")
            console.log((line_number))
            console.log("****************")
             
            Logger(id+"-"+value["messages"][0]["from"],value["messages"]) 

            const job = await requestQueue.add(messageObject);  
        }
        res.send("EVENT_RECEIVED");
    } catch (e) {        
        res.send("EVENT_RECEIVED");
    }
}
module.exports = { 
    VerifyToken, 
    ReceivedMessage
}