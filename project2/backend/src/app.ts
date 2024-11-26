import express from "express";
import {connectToDatabase, sequelize} from "./config/Database";
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Start the server
app.listen(port, async () => {
    await connectToDatabase();
    await sequelize.sync({ force: true });
  console.log(`Server is running at http://localhost:${port}`);
});
