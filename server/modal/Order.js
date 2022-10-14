import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
   
    googleId:{
        type:String,
        required:true
    },
    personName:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    orderlist:[
        {
            color:{
                type:String,
                required:true
            },
            fabric:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            type:{
                type:String,
                required:true 
            },
            images:{
                type:String,
                required:true
            }
        }
    ]



},{timestamps:true})





const order = mongoose.model('order', orderSchema);

export default order