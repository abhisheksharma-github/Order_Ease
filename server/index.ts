import dotenv from "dotenv";
dotenv.config(); // ✅ MUST come before using process.env

import express from "express";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const DIRNAME = path.resolve();

// Default middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// Static file serving
app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
    res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});

// Start server only after DB connection
connectDB().then(() => {
    app.listen(PORT, () => {
      
    });
}).catch((err) => {
   
});
