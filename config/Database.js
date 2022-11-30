
import Sequelize from 'sequelize';
import *  as dotenv from "dotenv";
dotenv.config();

const mysqlPassword = process.env.MYSQL_PASSWORD;
const mysqlUserName = process.env.MYSQL_USERNAME

const db = new Sequelize("ecommerce", mysqlUserName, mysqlPassword,
    {
        host: process.env.HOST,
        dialect: "mysql"
        
    })
   
export default db;