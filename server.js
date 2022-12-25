import express  from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routers/AuthRouter.js";
import ProductRouter from "./routers/ProductRouter.js";
import bodyParser from "body-parser";


dotenv.config();
const app = express();
const PORT = 5000;

try {
    await db.authenticate();
    console.log("Database connected ...");
}catch(error) {
    console.error(error)
}

app.use(express.static('Images'));
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(ProductRouter);


app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})