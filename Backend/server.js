require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");

const app = express();

// Connect Database
connectDB();


// Middleware
app.use(cors( {
  'origin' : ['http://localhost:5173', 'http://127.0.1.5173' , process.env.FRONTEND_URL], 
  'methods' : ['GET' , 'POST' , 'PUT' , 'DELETE'],
  'credentials' : true
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", require('./routes/productRoutes.js'));
app.use("/api/orders", require('./routes/orderRoutes.js'));
app.use("/api/payment", require('./routes/paymentRoutes.js'));
app.use("/api/analytics", require('./routes/analyticsRoutes.js'));

const path = require("path");

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../Frontend/dist/index.html")
    );
  });
  
} else {
  app.get("/", (req, res) => {
    res.send("Morphix API is running in Development mode...");
  });
}


const PORT = process.env.PORT || 5000;
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});