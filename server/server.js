const express = require("express");
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/user-routes");
const blogRouter = require("./routes/blog-routes");
require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, "../client/public")));

// Root route - serve index.html from client/public
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// Example additional route
app.use("/api", (req, res) => {
  res.send("API Home: Use /api/users or /api/blogs for specific actions.");
});

// Global error handling middleware (optional)
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
