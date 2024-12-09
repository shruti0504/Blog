const express = require("express");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db"); // Ensure your database connection file is correctly set up

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set view engine (if using templates like EJS)
app.set("view engine", "ejs");

// Serve static files (e.g., HTML, CSS, JS) from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Root route - handle requests to "/"
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API! Navigate to /api/users or /api/blogs.");
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// Example additional route
app.use("/api", (req, res) => {
  res.send("API Home: Use /api/users or /api/blogs for specific actions.");
});

// Global error handling middleware (optional, for debugging)
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Define port
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
