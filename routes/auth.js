const{Router}=require("express")
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { emailExiste } = require("../helpers/db-validators");


const router= Router()



router.post('/login',[
    check("contraseña", "La contraseña es obligatoria ").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    validarCampos
],login )





module.exports=router
