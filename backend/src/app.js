const express = require("express");
const cors = require("cors");

const app = express();
const songRoutes = require("./routes/song.routes");

app.use(express.json());
app.use(cors());

app.use("/api", songRoutes);

module.exports = app;
