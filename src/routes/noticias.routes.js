import { Router } from "express";
import { addNoticias, findAllNoticias } from "../controllers/noticias.controllers.js";
import { addNoticiasCloud } from "../controllers/noticiasCloud.controllers.js";
import { uploadFiles } from "../middlewares/upload.middleware.js";
import { uploadFilesCloud } from "../middlewares/uploadCloud.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

// Ruta Noticias
router.get('/', findAllNoticias);
router.post('/',verifyToken, uploadFiles, addNoticias);
router.post('/cloud/',verifyToken, uploadFilesCloud, addNoticiasCloud);

export default router