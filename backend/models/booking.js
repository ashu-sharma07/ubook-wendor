import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { BOOKING_STATUS } from "../constants.js";

class Booking extends Model {}

Booking.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Professionals",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressPinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(BOOKING_STATUS),
      defaultValue: "confirmed",
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "Bookings",
    timestamps: true,
  }
);

export default Booking;
