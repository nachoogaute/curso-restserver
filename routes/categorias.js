const{Router}=require("express")
const { check } = require("express-validator");

const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearCategoria, obtenerCategorias, actualizarCategoria, eliminarCategoria, obtenerCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { tieneRole } = require("../middlewares/validar.role");




const router= Router()

router.get("/",[
    validarCampos
],obtenerCategorias)

router.get("/:id",[
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
],crearCategoria)

router.put("/:id",[
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)

router.delete("/:id",[
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
],eliminarCategoria)






module.exports=router
