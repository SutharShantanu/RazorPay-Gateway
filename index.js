const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const Razorpay = require("razorpay");

const app = express();
const Port = process.env.Port || "4500";

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({ msg: "Welcome to the RazorPay-Gateway" });
});

const razorpayInstance = new Razorpay({
    key_id: `rzp_test_eZHxG92zSWnqTe`,
    key_secret: `F09vrzR0cFOgexHNyHytUbrg`,
});

app.post("/createOrder", (req, res) => {
    // Make sure to check if req.body is defined before destructuring
    if (!req.body) {
        res.status(400).json({ error: "Request body is missing or empty" });
        return;
    }

    // Destructure the properties from req.body
    const { amount, currency, receipt, notes } = req.body;

    razorpayInstance.orders.create(
        { amount, currency, receipt, notes },
        (err, order) => {
            if (!err) res.json(order);
            else res.send(err);
        }
    );
});

app.listen(Port, () => {
    console.log("Server is Listening on Port ", Port);
});
