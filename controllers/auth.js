const { response } = require("express");
const Usuario= require("../models/usuarios");
const bcryptjs= require("bcryptjs");
const generarJWT = require("../helpers/generar.jwt");








const login= async (req, res= response)=>{

    const {correo, contraseña}= req.body

    try{
        //Verificar si el correo existe
       const usuario= await Usuario.findOne({correo})
       if(!usuario){
           return res.status(400).json({
               msg:"Usuario / contraseña no son validos - email"
           })
       }

       //Si el usuario esta activo
       if(!usuario.estado){
           return res.status(400).json({
               msg:"Usuario / contraseña no son validos - estado:false"
           })
       }

        //Verificar contraseña
        const validarContraseña= bcryptjs.compareSync(contraseña, usuario.contraseña)
        if(!validarContraseña){
            return res.status(400).json({
                msg:"Usuario / contraseña no son validos - contraseña"
            })
        }

        //Generar jwt

        const token= await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            msg: "Hable con el administrador"
        })

    }
    }







module.exports={
    login
}