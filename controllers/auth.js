const { response } = require("express");
const Usuario= require("../models/usuario");
const bcryptjs= require("bcryptjs");
const generarJWT = require("../helpers/generar.jwt");
const { googleVerify } = require("../helpers/google-verify");









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

    const googleSingIn= async(req, res)=>{

        const {id_token}= req.body

        try{

            const {correo, nombre, img}= await googleVerify(id_token)

            let usuario= await Usuario.findOne({correo})

            if(!usuario) {
                //tengo que crearlo
                const data ={
                    nombre,
                    correo,
                    contraseña: "abc",
                    img,
                    google: true,
                    rol: "USER_ROLE"
                }
                usuario = new Usuario(data)
                await usuario.save()
            }

            if(!usuario.estado){
                return res.status(401).json({
                    msg: "Hable con el administrador, usuario bloqueado"
                })
            }

        //Generar jwt

        const token= await generarJWT(usuario.id)

            res.json({
                usuario,
                token
            })
        }catch(error){
            res.status(400).json({
                ok: false,
                msg: "El token no se pudo verificar"
            })
        }

    }







module.exports={
    login,
    googleSingIn
}