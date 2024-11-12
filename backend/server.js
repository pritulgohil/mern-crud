// import express from "express";
// dotenv.config({ path: "../.env" });

// import dotenv from "dotenv";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";
// import path from "path";

// const app = express();
// const PORT = process.env.PORT || 3000;
// const __dirname = path.resolve();
// app.use(express.json());

// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server started at http://localhost:${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config(); // Load environment variables at the top

import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Ensure MongoDB is connected before starting the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit if MongoDB connection fails
  });
