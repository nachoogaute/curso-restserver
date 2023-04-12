const jwt= require("jsonwebtoken")
const Usuario = require("../models/usuarios")





const validatJWT= async(req,res,next)=>{

    const token= req.header("x-token")

    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try{
       const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY)

       //Leer el usuario correspondiente al uid
       const usuario = await Usuario.findById(uid)

       if(!usuario){
        return res.status(401).json({
            msg: "Token no valido - usuario no existe DB"
        })
       }

       if(!usuario.estado){
        return res.status(401).json({
            msg: "Token no valido - usuario con estado: false"
        })
       }

       req.usuario= usuario

        next()
    }catch(error){
        console.log(error)
        res.status(401).json({
            msg: "Token no valido"
        })    
    }

    console.log(token)


}


module.exports={
    validatJWT
}