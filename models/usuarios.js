  const{Schema, model}= require("mongoose")

  const UsuarioSchema= Schema({
    nombre:{
        type: String,
        required:[true, "El nombre es obligatorio"]
    },
    correo:{
        type: String,
        required:[true, "El correo es obligatorio"],
        unique: true
    },
    contraseña:{
        type: String,
        required:[true, "La contraseña es obligatoria"]
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
  })

  UsuarioSchema.methods.toJSON= function(){
    const{__v, contraseña,_id, ...usuarios}=this.toObject()
    usuarios.uid= _id
    return usuarios
  }

  module.exports= model("Usuario", UsuarioSchema)