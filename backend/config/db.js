const mongoose = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected")
    } catch (error) {
        console.error("Database Error:", error.message)
        process.exit(1);
        
    }
};

module.exports = connectDB;