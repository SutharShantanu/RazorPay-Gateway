const express = require("express");
const cors = require("cors");
const connection = require("./Config/db.js");
const paymentRouter = require("./Routes/Payment.route.js");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send({ msg: "Welcome to the RazorPay-Gateway" });
});

app.use("/pay", paymentRouter);

app.get("/pay/getkey", (req, res) => {
    try {
        res.status(200).json({ key: process.env.RazorPay_Key_Id });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
});


app.listen(process.env.Port, async () => {
    await connection();
    console.log(`Server is Listening on Port ${process.env.Port}`);
});
