// Import DB Models
import Profession from "../models/profession.js";
import { PROFESSIONAL_CATEGORIES } from "../constants.js";
import { Op } from "sequelize";

// Import Async Error Handler Middleware
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Import Utils
import ErrorHandler from "../utils/errorHandler.js";
import {
  deleteHomePageCache,
  getHomePageCache,
  setHomePageCache,
} from "../utils/cacheManager.js";

const cacheKey = "homePageProfessions";

export const getProfessionsForHomePage = catchAsyncErrors(
  async (req, res, next) => {
    const cachedData = getHomePageCache(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        success: true,
        message: "Professions for home page fetched successfully (from cache)",
        data: cachedData,
      });
    }

    const professionsPerCategory = 5;
    const result = {};

    for (const category of PROFESSIONAL_CATEGORIES) {
      const professions = await Profession.findAll({
        where: { category },
        order: [["createdAt", "DESC"]],
        limit: professionsPerCategory,
      });

      result[category] = professions;
    }

    if (Object.keys(result).length === 0) {
      return next(new ErrorHandler("No profession types found", 404));
    }

    setHomePageCache(cacheKey, result);

    res.status(200).json({
      success: true,
      message: "Professions for home page fetched successfully",
      data: result,
    });
  }
);

// Search Professions -- Public
export const searchProfessions = catchAsyncErrors(async (req, res, next) => {
  const filter = {};

  if (req.query.name) {
    filter.name = { [Op.iLike]: `%${req.query.name}%` }; // Use iLike for case-insensitive search in PostgreSQL
  }

  const professions = await Profession.findAll({
    where: filter,
    attributes: ["name", "id"],
  });

  res.status(200).json({
    success: true,
    message: "Professions fetched successfully",
    data: {
      professions,
    },
  });
});

// Get All Professions -- Public
export const getAllProfessions = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const sort = req.query.sort || "createdAt";
  const order = sort.startsWith("-")
    ? [[sort.slice(1), "DESC"]]
    : [[sort, "ASC"]];
  const where = {};

  // Basic filtering
  if (req.query.category) {
    where.category = req.query.category;
  }

  if (req.query.name) {
    where.name = { [Op.iLike]: `%${req.query.name}%` };
  }

  const { count, rows: professions } = await Profession.findAndCountAll({
    where,
    order,
    offset,
    limit,
  });

  if (!professions.length && page > 1) {
    return next(new ErrorHandler("Page not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Professions fetched successfully",
    data: {
      count: professions.length,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      professions,
    },
  });
});

// Add Profession -- Private
export const addProfession = catchAsyncErrors(async (req, res, next) => {
  const { name, cover, category } = req.body;

  if (!name || !cover || !category) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const profession = await Profession.create({
    name,
    cover,
    category,
  });

  deleteHomePageCache(cacheKey);

  res.status(201).json({
    success: true,
    message: "Profession created successfully",
    data: profession,
  });
});

// Update Profession -- Private
export const updateProfession = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!Object.keys(updateData).length) {
    return next(new ErrorHandler("Please provide details to update", 400));
  }

  const profession = await Profession.findByPk(id);

  if (!profession) {
    return next(new ErrorHandler("Profession not found", 404));
  }

  await profession.update(updateData);
  deleteHomePageCache(cacheKey);

  res.status(200).json({
    success: true,
    message: "Profession updated successfully",
    data: profession,
  });
});

// Delete Profession -- Private
export const deleteProfession = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const profession = await Profession.findByPk(id);

  if (!profession) {
    return next(new ErrorHandler("Profession not found", 404));
  }

  await profession.destroy();
  deleteHomePageCache(cacheKey);

  res.status(200).json({
    success: true,
    message: "Profession deleted successfully",
  });
});
