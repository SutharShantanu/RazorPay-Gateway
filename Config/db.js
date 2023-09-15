const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.MongoDB);
        console.log(`Connected to DB`);
    } catch (error) {
        console.log(`Can't Connected to DB`);
        console.log(`Error: ${error}`);
    }
};

module.exports = { connection };
