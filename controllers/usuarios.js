const{response, request}= require("express")
const Usuario= require("../models/usuario")
const bcryptjs= require("bcryptjs")
const { emailExiste } = require("../helpers/db-validators")




const usuariosGet=async(req= request, res= response)=> {
    //const {q, nombre="No name", apikey, page=1, limit}= req.query
    const{limite=5,desde=0}= req.query
    const query= {estado:true}


    const[total,usuarios]=await Promise.all([
      Usuario.count({estado:true}),
      Usuario.find({estado:true})
          .skip(Number(desde))
          .limit(Number(limite))
    ])
    res.json({
      total,
      usuarios
    })
  }




  const usuariosPut=async(req, res= response)=> {

    const {id}= req.params
    const{_id, contraseña, google, ...resto}= req.body
          //Validar contra base de datos
    if(contraseña){

    const salt= bcryptjs.genSaltSync()
    resto.contraseña= bcryptjs.hashSync(contraseña, salt)
    }

    const usuario= await Usuario.findByIdAndUpdate(id, resto,{new:true})

    res.json({
        usuario
    })
  }




  const usuariosPost= async (req, res= response)=> {


    const {nombre, correo, contraseña, rol}= req.body
    const usuario= new Usuario({nombre, correo, contraseña, rol})

    //Verificar si el correo existe
    await emailExiste()


    //Encriptar contraseña
    const salt= bcryptjs.genSaltSync()
    usuario.contraseña= bcryptjs.hashSync(contraseña, salt)

    await usuario.save()

    res.json({
        usuario
    })




  }
  const usuariosDelete=async(req, res= response)=> {

    const{id}=req.params


    //const usuario= await Usuario.findByIdAndDelete(id)

    const usuario= await Usuario.findByIdAndUpdate(id, {estado: false})

    //const usuarioAutenticado= req.usuario

    res.json({
        usuario,
      //  usuarioAutenticado
    })




  }




  module.exports= {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
  }