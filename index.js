import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import cardRoute from "./routes/card.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 204,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

app.use("/carta", cardRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server está funcionando na porta ${PORT}`);
});