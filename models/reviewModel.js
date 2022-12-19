import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

    const Review = db.define("review", {
        rating: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        }
    })

export default Review;

