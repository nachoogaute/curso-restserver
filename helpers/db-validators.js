
const Role= require("../models/role")
const Usuario= require("../models/usuarios")


const esRoleValido = async(rol= "")=>{
    const existeRol= await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste= async(correo="")=>{
    const existeEmail= await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error("El email ya existe")
    }
}
const existeUsuarioPorId= async(id)=>{
    const existeUsuario= await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error("El ID no existe")
    }
}


module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}