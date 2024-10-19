import express from "express";
import mongoose from "mongoose";
import ruleRoutes from "./routes/rule.routes";
import connectDB from "./db/connectDB";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
);

// Routes
app.use("/api/rules", ruleRoutes);

// MongoDB connection
connectDB();
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
