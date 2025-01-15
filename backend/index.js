const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const webhooks = require("./controller/order/web");

const app = express();
app.use(helmet());

// Configure Content Security Policy with helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      connectSrc: ["'self'",  "https://api.stripe.com",process.env.FRONTEND_URL],
      // Add more directives as needed
    },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Ensure POST is included
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);
app.post("/api/webhook", express.raw({ type: "application/json" }), webhooks);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");

    console.log(`server running at ${PORT}`);
  });
});
