import express from "express";
import cors from "cors";

import cardRoute from "./routes/card.route.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js"

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  credentials: true,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use("/api/cartas", cardRoute);
app.use("/api/auth", authRoute);
app.use("/api/usuarios", userRoute);

app.listen(PORT, () => {
  console.log(`Server está funcionando na porta ${PORT}`);
});