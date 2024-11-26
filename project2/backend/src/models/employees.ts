import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database";

const Employee = sequelize.define(
    'Employee', 
    {
        tableName:'employee',
        employee_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        employee_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_avtar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
        employee_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_joining_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        employee_role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }
)

export default Employee;