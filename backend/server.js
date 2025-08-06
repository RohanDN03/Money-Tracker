require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes")
const dashboardRoutes =require("./routes/dashboardRoutes")

const app = express();

//Middleware to handle CORS

// app.use(
//     cors({
//         origin:process.env.CLIENT_URL || "*",
//         methods: ["GET","POST","PUT","DELETE"],
//         allowedHeaders:["Content-Type", "Authorization"],
//     })
// );

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5176"
//     ],
//     credentials: true,
//   })
// );
// ...existing code...
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://money-tracker-ashen-eight.vercel.app", // your deployed frontend
        "http://localhost:5173",                        // (optional) for local dev
        "http://localhost:5176" 
      ];
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// ...existing code...

// app.use(
//   cors({
//     origin: true, // Allows all origins (for deployment)
//     credentials: true,
//   })
// );

app.use(express.json());

connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income",incomeRoutes);
app.use("/api/v1/expense",expenseRoutes);
app.use("/api/v1/dashboard",dashboardRoutes);
//server uploads folder

app.use("/uploads", express.static(path.join(__dirname,"uploads")));


const PORT = process.env.PORT || 5050;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

