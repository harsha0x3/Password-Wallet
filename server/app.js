const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./db/connect");
const routes = require("./routes/password_routes");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/v1/passwords", routes);

(async () => {
  await connectDB(process.env.MONGO_URI);
  console.log("Connected to DB");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
