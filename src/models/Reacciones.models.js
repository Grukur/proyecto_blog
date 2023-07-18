import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";


const Reacciones = sequelize.define(
    "reacciones",
    {
        like: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    }
);

export default Reacciones;
