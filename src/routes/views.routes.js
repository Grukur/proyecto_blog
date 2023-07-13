import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import Noticias from "../models/Noticias.models.js";
const router = Router();

//ruta post usuarios
router.get(["/home", "/"], (req, res) => {
    let tokenTime = req.tokenTime
    res.render("home", {tokenTime:tokenTime});
});
router.get("/noticias", async (req, res) => {
    let tokenTime = req.tokenTime
    let data = await Noticias.findAll()
    res.render("noticias", {noticias:data, tokenTime:tokenTime})
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/registro", (req, res) => {
    res.render("registro");
});

router.get("/dashboard", verifyToken, (req, res) => {
    let tokenTime = req.tokenTime
    res.render("dashboard", {tokenTime:tokenTime});
});

router.get("/perfil", verifyToken, async (req, res) => {
    let usuario = req.usuario;
    let tokenTime = req.tokenTime
    res.render("perfil", {
        usuario: usuario.dataValues,
        tokenTime:tokenTime
    });
});
router.get("/subirNoticias", verifyToken, async (req, res) => {
    let tokenTime = req.tokenTime
    res.render("subirNoticias", {tokenTime:tokenTime});
})

export default router;
