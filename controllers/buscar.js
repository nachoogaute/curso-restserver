
const Categoria = require("../models/categoria")
const Producto = require("../models/producto")
const Usuario = require("../models/usuario")
const {ObjectId}= require("mongoose").Types


const coleccionesPermitidas=[
    "usuarios",
    "categorias",
    "productos",
    "roles"
]

const buscarUsuario= async(termino="", res)=>{
    
    const esMongoID= ObjectId.isValid(termino)

    if(esMongoID){
        const usuario= await Usuario.findById(termino)
        res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex= new RegExp(termino, "i")
    const usuarios= await Usuario.find({
        $or:[{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json({
        results: usuarios
    })
}

const buscarCategoria= async(termino="", res)=>{
    
    const esMongoID= ObjectId.isValid(termino)

    if(esMongoID){
        const categoria= await Categoria.findById(termino)
        res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex= new RegExp(termino, "i")
    const categorias= await Categoria.find({nombre: regex},{estado: true})

    res.json({
        results: categorias
    })
}

const buscarProducto= async(termino="", res)=>{
    
    const esMongoID= ObjectId.isValid(termino)

    if(esMongoID){
        const producto= await Producto.findById(termino)
                            .populate("categoria", "nombre")
        res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex= new RegExp(termino, "i")
    const productos= await Producto.find({nombre: regex},{estado: true})
                            .populate("categoria", "nombre")

    res.json({
        results: productos
    })
}


const buscar= (req, res)=>{


    const {coleccion, termino}= req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case "usuarios":
            buscarUsuario(termino, res)
        break;
        case "categorias":
            buscarCategoria(termino, res)
        break;
        case "productos":
            buscarProducto(termino, res)
        break;
    
        default:
            return res.status(500).json({
                msg: "Se le olvido hacer esta busqueda"
            })
        break;
    }
}


module.exports={
    buscar
}