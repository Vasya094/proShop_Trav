import mongoose from "mongoose";
 
//const uri = 'mongodb+srv://rin1234:509023@cluster0.8zgzc.mongodb.net/proshop?retryWrites=true&w=majority'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect( process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    } )
    console.log(`Mongodb Connected ${conn.connection.host}`)
  } catch (error) {
    console.log( `Error ${ error }` )
    process.exit(1)
  }
}

export default connectDB