import express from "express";
import cors from "cors";
import helmet from "helmet";

import { limiter } from "./middlewares/rateLimiter.js";
import { loadEnv } from "./config/env.js";

// Import Middlewares
import handleError from "./middlewares/error.js";

// import Routes
import routes from "./routes/index.js";

const app = express();

// Properly load all env variables
loadEnv();

// Passing Middlewares
app.use(express.json({ limit: "10kb" }));

app.use(
  cors({
    origin: [process.env.ALLOWED_ORIGIN_LOCAL, process.env.ALLOWED_ORIGIN_LIVE],
    credentials: true,
  })
);
app.use(limiter);
app.use(helmet());

// Welcome API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to uBook API",
  });
});

// Routes
app.use("/api/v1", routes);

// Middleware for error handling
app.use(handleError);

// 404
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});

export default app;
