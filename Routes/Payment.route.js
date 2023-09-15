const express = require("express");
const {
    checkout,
    PaymentVerification,
} = require("../Controllers/Payment.controller.js");

const PaymentRouter = express.Router();

PaymentRouter.post("/checkout", checkout);

// PaymentRouter.post("/paymentverification", PaymentVerification);

module.exports = { PaymentRouter };
