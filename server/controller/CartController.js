import { request } from "express";
import cart from "../modal/Cart.js";
import Item from "../modal/Items.js";

// $elemMatch


export const addtocart = async (request, response) => {
    const data = request.params.id;


    const exist = await cart.findOne({ googleId: data, productId: request.body.productId });
    const existproductId = await cart.findOne({ googleId: data, productId: request.body._id });
    if (existproductId) {
        response.status(202).json("already added")
        return;
    }

    if (exist){
        if (request.body.Quantity) {
            await exist.changequantity(request.body.Quantity)
            exist.save();
            response.status(200).json("success ")
        }
        else {
            response.status(500).json("already added")
        }
        return;
    }

    const addnewitems = new cart({
        productId: request.body._id,
        googleId: data,
        Quantity: 1,
        type: request.body.type,
        images: request.body.images,
        color: request.body.color,
        fabric: request.body.fabric,
        price: request.body.price,
        stock: request.body.stock
    })
    await addnewitems.save();
    response.status(203).json(addnewitems);
}
export const decreaseCartQuantity = async (request, response) => {
    try {
        const data = request.params.id;
        const exist = await cart.findOne({ googleId: data , type: request.body.type ,
            price: request.body.price , fabric: request.body.fabric ,  images: request.body.images });
           
        
            if (exist) {
            if (request.body.Quantity) {
                await exist.decreaseQuantity(request.body.Quantity)
                exist.save();
                response.status(200).json("success ")
            } else {
                response.status(500).json("already added")
            }

        }
    } catch (error) {
        console.log(error)
    }

}
export const totalamount = async (request, response) => {
    try {
        const data = request.params.id;
        const carttotal = await cart.find({ googleId: data });
        response.status(200).json(carttotal)
    } catch (error) {
        console.log(error)
    }


}


export const getCartItems = async (request, response) => {
    try {
        const data = request.params.id;
        const cartItems = await cart.find({ googleId: data });
        response.status(200).json(cartItems);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const SetStockOfProduct = async (request, response) => {
    try{
        
        const items = request.body;


        for (let index = 0; index < items.length; index++) {
            
           const findinproducts = await Item.findOne({ _id: items[index]._id })
            const res = await findinproducts.decreasestockquantity(items[index].quantity);
          
            if(res!=-1){
                await findinproducts.save();
                 
            }    
        }
        response.status(200).json("Successfully updated stock.") 
    }
    catch (error) {
        console.log(error)
    }

}

