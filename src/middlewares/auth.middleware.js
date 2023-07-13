import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.models.js";

export const emitToken = async (req, res, next) => {
    let { email, password } = req.body;
    let usuario = await Usuario.findOne({
        where: { email, password },
        attributes: ["usuarioId", "autor", "email"],
    });

    if (!usuario) {
        return res
            .status(400)
            .json({ code: 400, message: "Error de autenticación." });
    }
    let token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + 60 * 30,
            data: usuario,
        },
        process.env.PASSWORD_SECRET
    );
    req.token = token;
    console.log('Token given')
    next();
};

export const verifyToken = (req, res, next) => {
    try {
        let { token } = req.query;
        if (!token) {
            token = req.headers['authorization'];
            if (!token) {
                let msg = ("ruta protegida, debe proporcionar un token de acceso.")
                return redirectLogin(res, msg)
            }
            if (token.length == 0) {
                throw new Error("No se ha proporcionado un token");
            }
        }

        jwt.verify(
            token,
            process.env.PASSWORD_SECRET,
            async (error, decoded) => {
                if (error) {
                    let msg = ("debe proporcionar un token válido / su token puede estar expirado.")
                    return redirectLogin(res, msg)
                }

                try {
                    let usuario = await Usuario.findByPk(decoded.data.usuarioId, {
                        attributes: ["usuarioId", "autor", "email"],
                    });
                    if (!usuario) {
                        let msg = ("Usuario ya no existe en el sistema.")
                        return redirectLogin(res, msg)
                    }
                    const expTimestamp = decoded.exp;
                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    const remainingTime = expTimestamp - currentTimestamp;

                    req.usuario = usuario;
                    req.tokenTime = remainingTime

                    console.log('Token: verificado con exito')
                    next();
                } catch (error) {
                    res.status(500).json({ code: 500, message: "Error en autencicación." })
                }
            }
        );
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: error.message,
        });
    }
};

const redirectLogin = (res) => {
    setTimeout(() => {
        res.redirect("http://localhost:3000/login")
    })
};