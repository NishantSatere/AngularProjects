import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.SQL_DATABASE_NAME || "default_db_name",
    process.env.SQL_DATABASE_USER || "root", 
    process.env.SQL_DATABASE_PASSWORD || "password",
    {
        host: process.env.SQL_DATABASE_HOST || "127.0.0.1",
        dialect: "mysql",
        logging: console.log,
    }
);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export { sequelize, connectToDatabase };
