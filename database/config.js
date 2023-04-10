const mongoose= require("mongoose")


const dbConection= async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
           
        })
        console.log("Base de datos online")

    }catch(error){
        console.log(error)
        throw new Error("Error a la hora de iniciar una base de datos")

    }
}


module.exports={
    dbConection
}