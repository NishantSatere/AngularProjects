import express from "express"
import {
    getAllEmployees,
    LoginAdmin,
    RegisterAdmin,
    getEmployeeDetails,
    deleteEmployee,
    addEmployee
} from "../controllers/AdminController"
import { adminAuth } from "../middlewares/auth"
export const adminRouter = express.Router()

adminRouter.get('/',(req,res)=>{res.send("HELLO")})
adminRouter.post('/register' , RegisterAdmin)
adminRouter.post('/login', LoginAdmin)
adminRouter.get('/employees',adminAuth,getAllEmployees)
adminRouter.get('/employees/:id', adminAuth, getEmployeeDetails)
adminRouter.delete('/employees/:id', adminAuth, deleteEmployee)
adminRouter.post('/addemployee',adminAuth,addEmployee)

