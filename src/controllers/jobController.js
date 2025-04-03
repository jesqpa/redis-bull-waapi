const redisClient = require("../models/redisClient");
const processMessage = require("../shared/processMessage")
const whatsappService = require("../services/whatsappService");

const {SampleButtons,SampleList} = require("../shared/sampleModels");

const processJob = async (job) => {
        
    if(job.data){
        const { data } = job;    
        if(data){ 
            if(data.type == "in" && data.content){
                const messages = data.content[0];     
                const line_number = data.line_number;           
                var text = processMessage.GetTextUser(messages);
                var number = messages["from"];                
                if(text!=""){                    
                    await processMessage.Process(text,line_number,number);            
                }
            }else if(data.type == "out" && data.content){
                const messages = data.content;    
                const line_number = data.line_number;
                await Promise.resolve(whatsappService.SendMessageWhatsApp(line_number,messages));
                
                
                if(data.delay>0){
                    await delay(data.delay)
                }

                await delay(2);                
                whatsappService.SendMessageWhatsApp(line_number,SampleButtons(50683453485))
                whatsappService.SendMessageWhatsApp(line_number,SampleList(50683453485))
                
                
            }   
             
            
        }
    }
    return { status: "completado" };
};

const delay = async(seconds) => {
    await new Promise((resolve) => setTimeout(resolve, seconds*1000));
}

const onJobCompleted = async (job) => {
    const { data } = job;    
    if(data){        
        // Elimina el trabajo de Redis
        await redisClient.del(`job:${job.id}`);  // Ajusta la clave según lo que almacenes
        
        // También elimina el trabajo de la cola si es necesario
        await job.remove();
    }
};

const onJobFailed = (job, err) => {
    console.error(`********** Error en la tarea ${job.id}:`, err);
};

module.exports = {
    /*addJob,*/
    processJob,
    onJobCompleted,
    onJobFailed
};