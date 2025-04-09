// lib/mongoose.ts
import mongoose, { ConnectOptions } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

const connect = async (): Promise<void> => {
  if (mongoose.connection.readyState > 0) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    const options: ConnectOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const connection = await mongoose.connect(MONGO_URI, options);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: any) {
    if (error.name === 'MongoNetworkError') {
      console.error('Network error: Could not connect to MongoDB. Please check your network.');
    } else {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    }
    throw error;
  }
};

export default connect;
