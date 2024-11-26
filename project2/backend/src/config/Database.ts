import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'eds', // mysqldatabase name
    'root', // username
    'Nishant@123', // password{
    {
        'dialect': 'mysql',
        'host': '127.0.0.1',
        logging: console.log,
    })


const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export {
    sequelize,
    connectToDatabase
};