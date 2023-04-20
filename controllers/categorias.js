
const Categoria = require("../models/categoria")

const obtenerCategoria= async(req, res)=>{

    const{id}= req.params


    const categoria= await Categoria.findById( id).populate("usuario", "nombre")

    res.json({
        categoria
        
    })
}

const obtenerCategorias= async(req, res)=>{

    const{limite=5,desde=0}= req.query



    const[total,categorias]=await Promise.all([
      Categoria.count({estado:true}),
      Categoria.find({estado:true})
          .populate("usuario", "nombre")
          .skip(Number(desde))
          .limit(Number(limite))
    ])
    res.json({
      total,
      categorias
    })
}

const crearCategoria= async(req,res)=>{

    const nombre= req.body.nombre.toUpperCase() 

    const categoriaDB= await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }


        const data= {
            nombre,
            usuario: req.usuario._id
        }

        const categoria= new Categoria(data)
        await categoria.save()

        res.status(201).json(categoria)
    
}

const actualizarCategoria= async (req, res)=>{

    const {id}= req.params
    const {usuario,estado, ... resto}= req.body

    resto.nombre= resto.nombre.toUpperCase()
    
    const categoria= await Categoria.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        categoria
    })
}

const eliminarCategoria = async(req, res)=>{

    const {id}= req.params

    const categoria= await Categoria.findByIdAndUpdate(id, {estado: false})

    res.json({
        categoria
    })


}

module.exports={
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}