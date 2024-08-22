import mongoose from "mongoose";

const ConnectDb = async () => {
    try{
        const con = mongoose.connect(`${"mongodb+srv://rohitsoniahsi001:TEst@cluster0.zmfwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"}/${"TESt"}`);
        console.log("Database Connected SuccesFully")
    }
    catch(err){
        console.log("error while connecting to database",err)
    }
}
export  {ConnectDb}