const crypto = require("crypto");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const PaymentModel = require("../Models/payment.model.js");
require("dotenv").config();

const instance = new Razorpay({
    key_id: process.env.RazorPay_Key_Id,
    key_secret: process.env.RazorPay_Key_Secret,
});

const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            // amount: 49900,
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).send({ order });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};

const PaymentVerification = async (req, res) => {
    try {
        const payload = req.body;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            payload;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RazorPay_Key_Secret)
            .update(body.toString())
            .digest("hex");

        console.log(expectedSignature);
        console.log(razorpay_signature);

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const newPayment = new PaymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            await newPayment.save();

            res.redirect(
                `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            );
        } else {
            res.status(400).json({
                success: false,
            });
        }

    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};

module.exports = {
    checkout,
    PaymentVerification,
};
