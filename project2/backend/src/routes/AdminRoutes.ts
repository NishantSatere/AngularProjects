import express from "express"
import {
    getAllEmployees,
    LoginAdmin,
    RegisterAdmin,
    getEmployeeDetails
} from "../controllers/AdminController"
import { adminAuth } from "../middlewares/auth"
export const adminRouter = express.Router()

adminRouter.get('/',(req,res)=>{res.send("HELLO")})
adminRouter.post('/register' , RegisterAdmin)
adminRouter.post('/login', LoginAdmin)
// adminRouter.get('/employees',adminAuth,getAllEmployees)
adminRouter.get('/employees/:id', adminAuth, getEmployeeDetails);

