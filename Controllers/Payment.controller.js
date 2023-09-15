const instance = require("../index.js");
const crypto = require("crypto");
const PaymentModel = require("../Models/payment.model.js");

const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};

// const PaymentVerification = async (req, res) => {
//     try {
//         const { RazorPay_Order_Id, RazorPay_Payment_Id, RazorPay_Signature } =
//             req.body;

//         const body = RazorPay_Order_Id + "|" + RazorPay_Payment_Id;

//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
//             .update(body.toString())
//             .digest("hex");

//         const isAuthentic = expectedSignature === RazorPay_Signature;

//         if (isAuthentic) {
//             // Database comes here

//             await PaymentModel.create({
//                 RazorPay_Order_Id,
//                 RazorPay_Payment_Id,
//                 RazorPay_Signature,
//             });

//             res.redirect(
//                 `http://localhost:3000/paymentsuccess?reference=${RazorPay_Payment_Id}`
//             );
//         } else {
//             res.status(400).json({
//                 success: false,
//             });
//         }
//     } catch (error) {
//         res.status(400).send({ msg: error.message });
//     }
// };

module.exports = {
    checkout,
    // PaymentVerification
};