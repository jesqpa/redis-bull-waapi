const { application } = require("express");
const https = require("https");

function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v15.0/100240112809037/messages",
        method: "POST",
        body:data,
        headers: {
            "Content-Type":"application/json",
            Authorization: "Bearer EACDiR70YJHIBO2AMkVzO0OkNtY8FtnWTgvjzzfyAaOf9m7LGa8yZCBECvfAv1UqYcoPteXNr0RhRryfLk7dGGnXo1RVZBBD3s6eW7zvJKYZCm5wiPAwjoCwgEIdlXxfZADeU0BAyhMwcmzQHHEj1XmoUkUBocEK3yJuJw1oyp4eHtFgB1AQC4PmswDVLXzbDIAZDZD"
        }
    }

    const req = https.request(options, res => {
        res.on("data", d=>{
            process.stdout.write(d)         
            //console.log(JSON.parse(d.toString()))
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