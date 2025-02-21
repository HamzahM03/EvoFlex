import mongoose, { connect, mongo } from "mongoose";

const connectDB = async() => {

  mongoose.connection.on('connected', ()=> 
    console.log("Database Connected")
  );

  await mongoose.connect(process.env.MONGODB_URL, { dbName: "evo-flex" });

};

export default connectDB;