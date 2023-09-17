const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
});

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = PaymentModel;
