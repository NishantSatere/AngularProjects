import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database";

const Employee = sequelize.define(
    "Employee",
    {
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employee_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_avtar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        employee_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_zip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_joining_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        employee_role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "Employee", // Match the table name exactly
        timestamps: true, // Ensure createdAt and updatedAt are present
    }
);


export default Employee;

export interface IEmployee {
    employee_id: number;
    employee_name: string;
    employee_avtar: string;
    employee_gender: string;
    employee_dob: Date;
    employee_email: string;
    employee_phone: string;
    employee_city: string;
    employee_state: string;
    employee_country: string;
    employee_zip: string;
    employee_joining_date: Date;
    employee_role: string;
    employee_salary: number;
}
