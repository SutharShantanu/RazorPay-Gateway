const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
    RazorPay_Order_Id: {
        type: String,
        required: true,
    },
    RazorPay_Payment_Id: {
        type: String,
        required: true,
    },
    RazorPay_Signature: {
        type: String,
        required: true,
    },
});

const PaymentModel = mongoose.model("payment", PaymentSchema);
module.exports = { PaymentModel };
