const express = require("express");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5005;
const router = require("./routes");

const { connectMongo } = require("./utils");
connectMongo();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
