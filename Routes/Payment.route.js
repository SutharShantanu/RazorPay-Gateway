const express = require("express");
const {
    checkout,
    PaymentVerification,
} = require("../Controllers/Payment.controller.js");

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);

paymentRouter.post("/paymentverification", PaymentVerification);

module.exports = paymentRouter;
