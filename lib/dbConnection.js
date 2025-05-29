const mongoose = require('mongoose');
const dbConnection = async () => {
    const DB_URL =process.env.CONNECION_STRING
    try {
        const conn = await mongoose.connect(DB_URL);
        if(conn)
        console.log("✅ Connected to MongoDB successfully.");
        else console.log("connection failed")

    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err.message);
    }
};

module.exports = dbConnection;
