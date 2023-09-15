const express = require("express");
const cors = require("cors");

const connection = require("./Config/db.js");
const paymentRouter = require("./Routes/Payment.route.js");
require("dotenv").config();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send({ msg: "Welcome to the RazorPay-Gateway" });
});

app.use(express.json());

app.use("/pay",paymentRouter);

app.listen(process.env.Port, async () => {
    await connection();
    console.log(`Server is Listening on Port ${process.env.Port}`);
});

