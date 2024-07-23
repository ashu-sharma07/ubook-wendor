import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Booking from "./booking.js";

class Professional extends Model {}

Professional.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // table name
        key: "id",
      },
    },
    professionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Professions", // table name
        key: "id",
      },
    },
    services: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingHoursStart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingHoursEnd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slotDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 60, // in minutes
    },
    pricePerSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Professional",
    tableName: "Professionals", // Explicitly specify table name
    timestamps: true,
  }
);

Booking.belongsTo(Professional, {
  foreignKey: "professionalId",
  as: "professional",
});

export default Professional;
