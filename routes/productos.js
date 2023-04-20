const{Router}=require("express")
const { check } = require("express-validator");

const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto, crearProducto } = require("../controllers/productos");
const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");
const { tieneRole } = require("../middlewares/validar.role");




const router= Router()

router.get("/",[
    validarCampos
],obtenerProductos)

router.get("/:id",[
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es in ID de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

router.put("/:id",[
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
],actualizarProducto)

router.delete("/:id",[
    validarJWT,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
],eliminarProducto)






module.exports=router