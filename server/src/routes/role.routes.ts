


import { Router } from 'express'
import { createJobs , readJobs } from '../controller/role.controller'

const router = Router()

router.post('/create_role' , createJobs)
router.get('/read_role' , readJobs)


export default router