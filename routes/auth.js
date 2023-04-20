const{Router}=require("express")
const { check } = require("express-validator");
const { login, googleSingIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");



const router= Router()



router.post('/login',[
    check("contraseña", "La contraseña es obligatoria ").not().isEmpty(),
    check("correo", "El correo es obligatorio").isEmail(),
    validarCampos
],login )

router.post('/google',[
    check("id_token", "Token de google es necesario ").not().isEmpty(),
    validarCampos
],googleSingIn )






module.exports=router
