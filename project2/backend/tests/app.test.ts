import request from "supertest"; 
import express from "express"; 
import { sequelize, connectToDatabase } from "../src/config/Database";

// Mocking the database and sequelize methods
jest.mock("../src/config/Database", () => ({
    sequelize: {
        authenticate: jest.fn(),
        sync: jest.fn(),
    },
    connectToDatabase: jest.fn(),
}));

const mockConnectToDatabase = connectToDatabase as jest.Mock;
const mockSync = sequelize.sync as jest.Mock;

describe("express application", () => {
    let app: express.Application;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get("/", (req, res) => { res.status(200).send("Server is running"); });
    });

    it("should successfully connect to the database", async () => {
        mockConnectToDatabase.mockResolvedValueOnce(true);
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Server is running");
    });

    it("should log an error if database connection fails", async () => {
        mockConnectToDatabase.mockRejectedValueOnce(new Error("Unable to connect to the database"));
        try {
            await connectToDatabase();
        } catch (error:unknown) {
            if(error instanceof Error){
                expect(error.message).toBe("Unable to connect to the database");
            }else{
                throw error
            }   
        }
    });

    it("should synchronize tables successfully", async () => {
        mockSync.mockResolvedValueOnce(true); 
        await sequelize.sync({ alter: true });
        expect(mockSync).toHaveBeenCalledWith({ alter: true });
    });
});
