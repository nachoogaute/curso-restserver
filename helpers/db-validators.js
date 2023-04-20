
const Categoria = require("../models/categoria")
const Producto = require("../models/producto")
const Role= require("../models/role")
const Usuario= require("../models/usuario")


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

const existeCategoriaPorId= async(id)=>{
    const existeCategoria= await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error("El ID no existe")
    }
}
const existeProductoPorId= async(id)=>{
    const existeProducto= await Producto.findById(id)
    if(!existeProducto){
        throw new Error("El ID no existe")
    }
}

const coleccionesPermitidas= async(coleccion= "", colecciones=[])=>{

    const incluida= colecciones.includes(coleccion)
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true
}


module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}