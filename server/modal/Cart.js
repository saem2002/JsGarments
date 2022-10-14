import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    googleId:{
        type:String
    },
    type:{
        type:String
    },
    images:{
        type:String
    },
    color:{
    type:String,
    
    
   },
   fabric:{
       type:String,
      
   },
   price:{
    type:String,
    
   },
   stock:{
    type  : Number,
    validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
  
   
   },
   Quantity:{
    type  : Number,
    validate : {
        validator : Number.isInteger,
        message   : '{VALUE} is not an integer value'
      }
    },



},{timestamps:true})
cartSchema.methods.changequantity=async function(count){
    try{
        this.Quantity = count+1;
        await this.save();
        return this.Quantity;

    }catch(error){
        console.log(error);
    }

}
cartSchema.methods.decreaseQuantity=async function(count){
    try{
        this.Quantity = count-1;
        await this.save();
        return this.Quantity;

    }catch(error){
        console.log(error);
    }

}
cartSchema.methods.resetstocks=async function(stockset){
    try{
        if(stockset===null){
            return;
        }
        this.stock = stockset;
        await this.save();
        return this.stock;

    }catch(error){
        console.log(error);
    }

}

cartSchema.methods.setstock=async function(stock){
    try{
        this.stock = stock;
        if(stock==0){
            this.Quantity=stock;
        }
        await this.save();
        return this.stock;
  
    }catch(error){
        console.log(error);
    }
  
  }




const cart = mongoose.model('cart', cartSchema);

export default cart;