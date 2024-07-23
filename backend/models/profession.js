import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { PROFESSIONAL_CATEGORIES } from "../constants.js";
import Professional from "./professional.js";

class Profession extends Model {}

Profession.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.cover) return null;
        return `${process.env.AWS_CLOUDFRONT_BASE_URL}/${this.cover}`;
      },
      set(value) {
        throw new Error("Do not try to set the `coverUrl` value!");
      },
    },
    category: {
      type: DataTypes.ENUM(PROFESSIONAL_CATEGORIES),
      allowNull: false,
      validate: {
        isIn: {
          args: [PROFESSIONAL_CATEGORIES],
          msg: "please provide a valid professional category",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Profession",
    tableName: "Professions", // Explicitly specify table name
    timestamps: true,
  }
);

// Define associations
Professional.belongsTo(Profession, {
  foreignKey: "professionId",
  as: "profession",
});

export default Profession;
