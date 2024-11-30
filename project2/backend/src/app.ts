import express from "express";
import dotenv from 'dotenv';
import { connectToDatabase, sequelize } from "./config/Database";
import cors from "cors";
import { adminRouter } from "./routes/AdminRoutes"; 

const app = express();
const port = 3000;
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/admin', adminRouter);

const startServer = async () => {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log("Database connected successfully.");
    
    // Sync tables (use cautiously in production)
    // await sequelize.sync({ alter: true });
    // console.log("Tables synchronized successfully.");

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during application startup:", error);
    process.exit(1); // Exit process on critical error
  }
};

// Start the application
startServer();
