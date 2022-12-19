import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
 const Product = db.define("products", {
        imgUrl: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shortDescription: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.TEXT
        },
     
        published: {
            type: DataTypes.BOOLEAN
        }
    
    })

    export default Product;
