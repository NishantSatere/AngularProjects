import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Admin from "../models/admin";
import { IEmployee } from "../models/employees";
import Employee from "../models/employees";
import { validationResult, check, header } from "express-validator";
import asyncHandler from "../helpers/asyncHandler";
import jwt from "jsonwebtoken"
import Busboy from "busboy";
import { generateUploadUrl, getImageUrl } from "../services/S3clientConfig"

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
        // console.log("Employee details:", employee?.dataValues.employee_avtar);
        // const imageName = employee.?employee_avtar || "default.jpg";
        const getPresignedURL = await getImageUrl(employee?.dataValues.employee_avtar || "default.jpg");
        console.log("Presigned URL:", getPresignedURL);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ employee });
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return res.status(500).json({ message: "Failed to fetch employee details", error });
    }
});

const deleteEmployee = asyncHandler(async (req: Request, res: Response, next) => {
    try {
        const id: number = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid ID parameter" });
        }

        const employee = await Employee.findOne({ where: { employee_id: id } })
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        await Employee.destroy({ where: { employee_id: id } });
        return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {

    }
})

const addEmployee = asyncHandler(async (req: Request, res: Response) => {
    try {
        const contentType = req.headers["content-type"] || "";
        if (!contentType.includes("multipart/form-data")) {
            return res.status(400).send({ msg: "Invalid Content-Type" });
        }

        const busboy = Busboy({ headers: req.headers });
        const formData: Record<string, any> = {};
        const files: { fieldname: string; filename: string; presignedURL: string; buffer: Buffer; }[] = [];

        let updatedFileName: string;

        busboy.on("file", (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
            const chunks: Buffer[] = [];
            const generateUniqueFileName = (filename: any) => {
                filename = filename.filename;
                const baseName = filename.includes(".") ? filename.substring(0, filename.lastIndexOf(".")) : filename;
                const extension = filename.includes(".") ? filename.substring(filename.lastIndexOf(".")) : "";
                return `${baseName}-${Date.now()}${extension}`;
            };

            filename = generateUniqueFileName(filename);
            updatedFileName = filename;

            file.on("data", (chunk) => {
                chunks.push(chunk);
            });

            file.on("end", async () => {
                const buffer = Buffer.concat(chunks);
                // console.log('Buffer length:', buffer.length);
                try {
                    // Extract form data
                    const { name, email, gender, dob, phone, city, state, country, zip, joining_date, role, salary } = formData;

                    if (!name || !email) {
                        return res.status(400).send({ msg: "Name and email are required" });
                    }

                    // Check if employee already exists
                    const isExistingEmployee = await Employee.findOne({ where: { employee_email: email } });
                    if (isExistingEmployee) {
                        return res.status(400).json({ msg: "Email already registered" });
                    }

                    // Now that email is not registered, proceed with the file upload

                    // Generate presigned URL
                    const presignedURL = await generateUploadUrl(filename, mimetype);
                    console.log('Generated Presigned URL:', presignedURL);

                    // Upload file to presigned URL
                    const response = await fetch(presignedURL, {
                        method: 'PUT',
                        headers: { 'Content-Type': mimetype },
                        body: buffer,
                    });

                    if (!response.ok) {
                        const errorMessage = await response.text();
                        console.error('Failed to upload file:', errorMessage);
                        return res.status(500).json({ msg: 'File upload failed', error: errorMessage });
                    }

                    // If upload is successful, push file data and presigned URL into the files array
                    files.push({
                        fieldname,
                        filename: updatedFileName,
                        presignedURL,
                        buffer
                    });

                    // Create new employee record in database
                    const newEmployee = await Employee.create({
                        employee_name: name,
                        employee_avtar: updatedFileName,
                        employee_gender: gender,
                        employee_dob: dob,
                        employee_email: email,
                        employee_phone: phone,
                        employee_city: city,
                        employee_state: state,
                        employee_country: country,
                        employee_zip: zip,
                        employee_joining_date: joining_date,
                        employee_role: role,
                        employee_salary: salary,
                    });

                    // Respond with success
                    res.status(200).send({ newEmployee, files });

                } catch (err: unknown) {
                    console.error('Error during file upload or database operation:', err);
                    if (err instanceof Error) {
                        return res.status(500).json({ msg: 'Error during file upload or database operation', error: err.message });
                    } else {
                        return res.status(500).json({ msg: "Error during file upload or database operation" });
                    }
                }
            });
        });

        busboy.on("field", (fieldname, value) => {
            formData[fieldname] = value;
        });

        busboy.on("finish", () => {
            console.log("file upload completed");
        });

        req.pipe(busboy);

    } catch (err) {
        console.error('Error adding employee:', err);
        return res.status(500).json({ msg: 'Failed to add employee', error: err });
    }
});


export {
    RegisterAdmin,
    LoginAdmin,
    getAllEmployees,
    getEmployeeDetails,
    deleteEmployee,
    addEmployee
}