import mongoose from 'mongoose';

const URL = 'mongodb://127.0.0.1:27017/resume_filter';
// const URL = 'mongodb+srv://root:root@web-app.qfkecpv.mongodb.net/resume01';
/**
 * The function `connect` connects to a MongoDB database using the Mongoose library in TypeScript.
 */
const connect = async () => {
  try {
    await mongoose.connect(URL);
    console.log('Connected to the MongoDB database successfully');
  } catch (error) {
    console.error('Error connecting to the MongoDB database:', error);
  }
};

export default connect;
