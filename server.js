import express  from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routers/index.js";


dotenv.config();
const app = express();
const PORT = 5000;

try {
    await db.authenticate();
    console.log("Database connected ...");
}catch(error) {
    console.error(error)
}

app.use(cors({credential:true, origin:"http://localhost:3000" }))
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})