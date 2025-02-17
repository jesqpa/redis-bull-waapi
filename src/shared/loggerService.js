const fs = require('fs');

function Logger(nombre,message) {
    const timestamp = new Date().toISOString();
    const fecha = timestamp.substring(0, 10);
    const hora = timestamp.substring(11, 19);
    const logEntry = `${fecha} ${hora} - ${JSON.stringify(message)}\n`;

    fs.appendFile(`./logs/${nombre}-${fecha.replaceAll("-","")}.txt`, logEntry, (err) => {
        if (err) {
            console.error('Error escribiendo en el archivo:', err);
        }
    });
}

module.exports = {
    Logger
}