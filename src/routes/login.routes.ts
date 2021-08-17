import { Router } from "express";
import { login } from "../controllers/login.controller";


const ruta = Router();

ruta.route('/')
.post(login)

export default ruta;