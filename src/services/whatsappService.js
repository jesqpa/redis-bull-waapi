const { application } = require("express");
const https = require("https");

function SendMessageWhatsApp(line,data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v15.0/"+line+"/messages",
        method: "POST",
        body:data,
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer "+process.env.WAP_BEARER
        }
    }

    const req = https.request(options, res => {
        res.on("data", d=>{
            process.stdout.write(d)         //console.log(JSON.parse(d.toString()))            
        });
    });

    req.on("error", error => {
        console.error(error);
    });   

    req.write(data);

    req.end();
    
}

module.exports = {
    SendMessageWhatsApp
}