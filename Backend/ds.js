const mongoose = require('mongoose');

// Direct URI (not recommended for production — use env in future)
const mongoURI = "mongodb+srv://user0:dbuserao@cluster0.ljg5plz.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "myBlogs" // optional, sets DB name explicitly
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1); // Optional: exit on failure
  }
};

module.exports = connectToMongo;
