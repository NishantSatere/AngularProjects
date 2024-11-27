import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Admin from "../models/admin";
import { IEmployee } from "../models/employees";
import Employee from "../models/employees";
import { validationResult, check } from "express-validator";
import asyncHandler from "../helpers/asyncHandler";
import jwt from "jsonwebtoken"

const RegisterAdmin = asyncHandler(async (req: Request, res: Response, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Some fields are missing" });
        }

        // Email validation
        await check('email')
            .isEmail()
            .withMessage("Invalid email format")
            .custom((value) => value.endsWith('gmail.com'))
            .withMessage("Email must end with 'gmail.com'")
            .run(req);

        // Check for validation errors after email validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the email is already registered (before checking password)
        const isExistingAdmin = await Admin.findOne({ where: { admin_email: email } });
        if (isExistingAdmin) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // Password validation
        await check('password')
            .isStrongPassword()
            .withMessage("Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.")
            .run(req);

        // Check for validation errors after password validation
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Hash password and save the new admin
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            admin_name: name,
            admin_email: email,
            admin_password: hashpassword,
        });

        return res.status(201).json({ newAdmin });
    } catch (error) {
        console.error("Error in RegisterAdmin:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

const LoginAdmin = asyncHandler(async (req: Request, res: Response, next) => {
    try {
        const { email, password } = req.body;

        // Email validation
        await check('email')
            .isEmail()
            .withMessage("Invalid email format")
            .custom((value) => value.endsWith('gmail.com'))
            .withMessage("Email must end with 'gmail.com'")
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const isExistingAdmin = await Admin.findOne({ where: { admin_email: email } });
        if (!isExistingAdmin) {
            return res.status(400).json({ msg: "User isn't registered" });
        }

        const passwordMatch = await bcrypt.compare(password, isExistingAdmin.dataValues.admin_password);
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = jwt.sign(
            {
                admin_id: isExistingAdmin.dataValues.admin_id,
                admin_email: isExistingAdmin.dataValues.admin_email,
                user_type: 'admin',
            },
            'secret_key',
            { expiresIn: '1h' }
        );

        return res.status(200).json({ msg: "Login successful", admin: isExistingAdmin, token });
    } catch (error) {
        console.error("Error in LoginAdmin:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});



const getAllEmployees = asyncHandler(async (req: Request, res: Response, next) => {
    try {
        const employees = await Employee.findAll();
        // console.log(JSON.stringify(employees, null, 2));

        const employeeArr: IEmployee[] = employees.map((employee) =>
            employee.toJSON() as unknown as IEmployee
        );

        const arrySize = employeeArr.length

        return res.status(200).json({ arrySize: arrySize, employees: employeeArr });
    } catch (error) {
        console.error("Error fetching employees:", error);
        return res.status(500).json({ message: "Failed to fetch employees", error });
    }
});

const getEmployeeDetails = asyncHandler(async (req: Request, res: Response, next) => {
    try {
        // Get id from route parameters
        const id: number = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }
        // console.log("Employee ID:", id);
        
        const employee = await Employee.findOne({ where: { employee_id: id } });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ employee });
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return res.status(500).json({ message: "Failed to fetch employee details", error });
    }
});

export {
    RegisterAdmin,
    LoginAdmin,
    getAllEmployees,
    getEmployeeDetails
}