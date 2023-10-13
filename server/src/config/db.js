import mongoose from "mongoose";

const connectMongo = async () => {
    
    // Getting URI from .env
    const mongoURI = process.env.MONGO_URI;

    // Checking if we have URI
    if (!mongoURI) {
      console.log('Missing MONGO_URI in .env');
      return;
    }
   
    // Using URI to create connection, catching error if failed
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongo;