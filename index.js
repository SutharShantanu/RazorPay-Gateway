const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const PaymentRouter = require("./Routes/Payment.route.js");
const { connection } = require("./Config/db.js");
require("dotenv").config();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send({ msg: "Welcome to the RazorPay-Gateway" });
});

app.use(express.json());

// app.use("/pay", PaymentRouter);

const instance = new Razorpay({
    key_id: process.env.RazorPay_Key_Id,
    key_secret: process.env.RazorPay_Key_Secret,
});

app.listen(process.env.Port, async () => {
    await connection();
    console.log(`Server is Listening on Port  ${process.env.Port}`);
});

module.exports = { instance };
