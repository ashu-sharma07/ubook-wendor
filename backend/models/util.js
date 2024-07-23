import mongoose from "mongoose";
import { COUNTRIES } from "../constants.js";

export const addressSchema = new mongoose.Schema({
  country: {
    type: String,
    enum: {
      values: COUNTRIES,
      message: "{VALUE} is not a valid country",
    },
    default: "USA",
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});

export const locationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
