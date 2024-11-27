import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'eds', // MySQL database name
    'root', // username
    'Nishant@123', // password
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: console.log, // Enable logging to debug SQL queries
    }
);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { sequelize, connectToDatabase };
