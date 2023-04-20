const{Router}=require("express")
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { cargarArchivo, actualizarArchivo, mostrarImagen } = require("../controllers/uploads");
const {coleccionesPermitidas}= require("../helpers/db-validators");
const { validarArchivo } = require("../middlewares/validar-archivo");


const router= Router()


router.post("/",validarArchivo, cargarArchivo)

router.put("/:coleccion/:id",[
    validarArchivo,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom(c => coleccionesPermitidas(c, ["usuarios", "productos"])),
    validarCampos
],actualizarArchivo)

router.get("/:coleccion/:id",[
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom(c => coleccionesPermitidas(c, ["usuarios", "productos"])),
    validarCampos
], mostrarImagen)






module.exports=router
