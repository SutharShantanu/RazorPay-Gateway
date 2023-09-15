const express = require("express");
const {
    checkout,
    PaymentVerification,
} = require("../Controllers/Payment.controller.js");

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);

// PaymentRouter.post("/paymentverification", PaymentVerification);

module.exports = paymentRouter;
