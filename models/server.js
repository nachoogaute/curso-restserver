const express = require('express')
const cors = require('cors')
const{dbConection}= require("../database/config")
const fileUpload= require("express-fileupload")



class Server{

    constructor(){
        this.app= express()

        this.port= process.env.PORT
    
        this.usuariosPath= "/api/usuarios"
        this.authPath= "/api/auth"
        this.categoriasPath="/api/categorias"
        this.productosPath= "/api/productos"
        this.buscarPath= "/api/buscar"
        this.uploadsPath= "/api/uploads"


        this.conectarDB()

        this.middlewares()
        this.routes()
    }

    middlewares(){

        this.app.use(cors())

        this.app.use(express.json())

        this.app.use(express.static("public"))

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    async conectarDB(){
        await dbConection()
    }

    routes(){

        this.app.use(this.authPath, require("../routes/auth"))
        this.app.use(this.usuariosPath, require("../routes/user"))
        this.app.use(this.categoriasPath, require("../routes/categorias"))
        this.app.use(this.productosPath, require("../routes/productos"))
        this.app.use(this.buscarPath, require("../routes/buscar"))
        this.app.use(this.uploadsPath, require("../routes/uploads"))    
    }    
    
    

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor corriendo en el puerto", this.port)
        })
    }


}

module.exports= Server