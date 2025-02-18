

function SampleText(textResponse, number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": textResponse
        }
    });

    return data;
}

function SampleImage(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "image",
        "image": {
            "link": "https://s1.significados.com/foto/paisaje-natural.jpg"
        }
    });

    return data;
}

function SampleAudio(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "audio",
        "audio": {
            "link": "https://file-examples.com/storage/fe09214136679e20eb0f9fe/2017/11/file_example_MP3_1MG.mp3"
        }
    });

    return data;
}

function SampleVideo(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "video",
        "video": {
            "link": "https://file-examples.com/storage/fe09214136679e20eb0f9fe/2017/04/file_example_MP4_1280_10MG.mp4"
        }
    });

    return data;
}

function SampleDocument(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "recipient_type": "individual",
        "to": number,
        "type": "document",
        "document": {
            "link": "https://file-examples.com/storage/fe09214136679e20eb0f9fe/2017/10/file-example_PDF_1MB.pdf"
        }
    });

    return data;
}

function SampleLocation(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "location",
        "location": {
            "latitude": "10.368506",
            "longitude": "-84.465035",
            "name": "Ubicación de mi casa",
            "address": "Provincia de Alajuela, San Carlos"
        }
    });

    return data;
}

function SampleList(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
          "type": "list",
          "header": {
            "type": "text",
            "text": "📌 Opciones disponibles"
          },
          "body": {
            "text": "Por favor, selecciona una opción:"
          },
          "footer": {
            "text": "Desliza para ver más opciones."
          },
          "action": {
            "button": "Ver opciones",
            "sections": [
              {
                "title": "Categoría 1",
                "rows": [
                  {
                    "id": "opcion_1",
                    "title": "✅ Opción 1",
                    "description": "Descripción de la opción 1."
                  },
                  {
                    "id": "opcion_2",
                    "title": "⚡ Opción 2",
                    "description": "Descripción de la opción 2."
                  }
                ]
              },
              {
                "title": "Categoría 2",
                "rows": [
                  {
                    "id": "opcion_3",
                    "title": "📅 Opción 3",
                    "description": "Descripción de la opción 3."
                  },
                  {
                    "id": "opcion_4",
                    "title": "🔔 Opción 4",
                    "description": "Descripción de la opción 4."
                  }
                ]
              }
            ]
          }
        }
      }
      );

    return data;
}

function SampleButtons(number){
    
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header":{
                "type":"text",
                "text":"Opciones de registro"
            },
            "body": {
                "text": "Desea registrarse"
            },        
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "001",
                            "title": "Aceptar"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "002",
                            "title": "Cancelar"
                        }
                    }
                ]
            }
        }
    });

    return data;
}

module.exports = {
    SampleAudio,
    SampleButtons,
    SampleDocument,
    SampleImage,
    SampleList,
    SampleLocation,
    SampleText,
    SampleVideo
}