import express, { Request, Response } from "express";
import productsRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";
import signupRouter from "./routes/auth/signup.js";
import loginRouter from "./routes/auth/login.js";
import meRouter from "./routes/auth/me.js";
import cartRouter from "./routes/cart.js";
import ordersRouter from "./routes/orders.js";
import deleteAccRouter from "./routes/auth/delete-account.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.json("Server is running!");
});

app.get("/run-script", () => {});

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth/signup", signupRouter);
app.use("/api/auth/login", loginRouter);
app.use("/api/auth/me", meRouter);
app.use("/api/auth/delete-account", deleteAccRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);

app.listen(PORT, () => {
  console.log(`Server is running happily on port ${PORT}!`);
});
