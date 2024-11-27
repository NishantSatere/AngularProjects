import { DataTypes } from "sequelize";
import { sequelize } from "../config/Database";

const Admin = sequelize.define(
    'Admin',
    {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        admin_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

export default Admin