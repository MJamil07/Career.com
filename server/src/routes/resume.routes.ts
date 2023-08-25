import { Router } from "express";
import { getLocation, get_role_based, read, upload } from "../controller/resume.controller";

const router = Router()


router.post('/upload_resume' , upload)
router.get('/read_resume' , read)
router.get('/get_resume/:id' , get_role_based)
router.get('/get_location' , getLocation)


export default router

