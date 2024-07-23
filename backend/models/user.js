import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { USER_ROLES } from "../constants.js";
import Professional from "./professional.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import ErrorHandler from "../utils/errorHandler.js";
import {
  setVerificationCode,
  getVerificationCode,
  deleteVerificationCode,
} from "../utils/cacheManager.js";

class User extends Model {
  getJwtToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    });
  }

  generateAndCacheVerificationCode() {
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    setVerificationCode(this.id, verificationCode);
    return verificationCode;
  }

  validateVerificationCode(code) {
    const storedCode = getVerificationCode(this.id);
    if (storedCode == code) {
      deleteVerificationCode(this.id);
      return true;
    }
    return false;
  }

  clearVerificationCode() {
    deleteVerificationCode(this.id);
  }
}

User.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "User",
      validate: {
        len: [2, 100],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ubook-avatar.png",
    },
    avatarUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.avatar) return null;
        return `${process.env.AWS_CLOUDFRONT_BASE_URL}/${this.avatar}`;
      },
      set(value) {
        throw new Error("Do not try to set the `avatarUrl` value!");
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isPhone(value) {
          if (!validator.isMobilePhone(value)) {
            throw new ErrorHandler("Please provide a valid phone number", 400);
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM(USER_ROLES),
      allowNull: false,
      validate: {
        isIn: {
          args: [USER_ROLES],
          msg: "Please provide a valid role",
        },
      },
      defaultValue: "customer",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users", // Explicitly specify table name
    timestamps: true,
  }
);

// Define associations
Professional.belongsTo(User, { foreignKey: "userId", as: "user" });

export default User;
