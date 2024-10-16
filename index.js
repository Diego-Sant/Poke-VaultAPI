import express from "express";
import cors from "cors";

import cardRoute from "./routes/card.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const port = 8080;

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/carta", cardRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Server aberto em http://localhost:${port}`);
});