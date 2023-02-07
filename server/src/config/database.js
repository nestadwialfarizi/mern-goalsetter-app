import mongoose from 'mongoose';

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
