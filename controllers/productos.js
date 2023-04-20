
const Producto = require("../models/producto")

const obtenerProducto= async(req, res)=>{

    const{id}= req.params


    const producto= await Producto.findById( id).populate("usuario", "nombre")
                                                .populate("categoria", "nombre")
    res.json({
        producto
        
    })
}

const obtenerProductos= async(req, res)=>{

    const{limite=5,desde=0}= req.query



    const[total,productos]=await Promise.all([
      Producto.count({estado:true}),
      Producto.find({estado:true})
          .populate("usuario", "nombre")
          .populate("categoria", "nombre")
          .skip(Number(desde))
          .limit(Number(limite))
    ])
    res.json({
      total,
      productos
    })
}

const crearProducto= async(req,res)=>{

    const {estado, usuario, ...body}= req.body 

    const productoDB= await Producto.findOne({nombre: body.nombre})

    if(productoDB){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }


        const data= {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id


        }

        const producto= new Producto(data)
        await producto.save()

        res.status(201).json(producto)
    
}

const actualizarProducto= async (req, res)=>{

    const {id}= req.params
    const {usuario,estado, ... resto}= req.body

    if(resto.nombre){
        resto.nombre= resto.nombre.toUpperCase()
    }

    
    const producto= await Producto.findByIdAndUpdate(id, resto, {new:true})

    res.json({
        producto
    })
}

const eliminarProducto = async(req, res)=>{

    const {id}= req.params

    const producto= await Producto.findByIdAndUpdate(id, {estado: false, disponible: false} )

    res.json({
        producto
    })


}

module.exports={
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    eliminarProducto
}