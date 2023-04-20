const path = require("path")
const fs= require("fs")


const { subirArchivo } = require("../helpers/subir-archivo");
const { validarArchivo } = require("../middlewares/validar-archivo");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");





const cargarArchivo= async(req, res)=>{

    try{
        const nombre= await subirArchivo(req.files,undefined, "imagenes")
        res.json({nombre})
        
    }catch(msg){
        res.status(400).json({msg})
    }

}

const actualizarArchivo= async(req, res)=>{


    const{id,coleccion}= req.params

    let modelo

    switch (coleccion) {
        case "usuarios":
            modelo= await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            break;
        case "productos":
            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({msg:"Se me olvido validar esto"})
    }

    if(modelo.img){
        const pathImagen= path.join(__dirname, "../uploads", coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync( pathImagen )
        }
    }

    const nombre= await subirArchivo(req.files,undefined, coleccion)
    modelo.img= nombre

    await modelo.save()

    res.json({modelo})

    
}

const mostrarImagen= async (req, res)=>{


    const{id, coleccion}= req.params

    let modelo

    switch (coleccion) {
        case "usuarios":
            modelo= await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
            break;
        case "productos":
            modelo= await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({msg:"Se me olvido validar esto"})
    }

    if(modelo.img){
        const pathImagen= path.join(__dirname, "../uploads", coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){
             return res.sendFile(pathImagen)
        }
    }else{
        const pathImagen= path.join(__dirname, "../assets/no-image.jpg")
        if(fs.existsSync(pathImagen)){
             return res.sendFile(pathImagen)

    }

   


    }


    
}


module.exports={
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen
}