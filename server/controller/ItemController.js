import Items from "../modal/Items.js"
import cloudinary from 'cloudinary';
import cart from "../modal/Cart.js";



export const addItems = async (request, response) => {
    try {
        const file = request.files.Image;
        if(!request.body.type || !request.body.price || !request.body.fabric || !request.body.stock 
            || !request.body.color || !file ){
                response.status(400).json('not data filling')
                return;
            }
        let alreadyexist = await Items.findOne({
    
            type: request.body.type,
            price: request.body.price,
            fabric: request.body.fabric,
            stock: request.body.stock,
            color: request.body.color
        })
        if (alreadyexist) {
    
            response.status(201).json("already added");
            return;
        }
        cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
    
    
    
            const product = new Items({
                images: result.url,
                type: request.body.type,
                price: request.body.price,
                fabric: request.body.fabric,
                stock: request.body.stock,
                color: request.body.color
            });
            product.save();
    
            response.status(200).json("added");
        }) 
    } catch (error) {
        console.log(error)
    }
 

}
export const update = async (request, response) => {
    try {
      

        const findinitems = await Items.findOne({ _id: request.body.id });
        if (findinitems) {
            await findinitems.commitchanges( request.body.type, request.body.price, request.body.fabric, request.body.stock, request.body.color);
            await findinitems.save();
            response.status(200).json("updated");
        }
     

      









    } catch (error) {
        console.log(error)
        response.status(400).json(error);
    }
}

export const getItems = async (request, response) => {
    try {
        const items = await Items.find({});
        response.status(200).json(items);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getsubcategory = async (request, response) => {
    try {
        const category= request.params.subcategory
        const underprice= request.params.price
        const sort= request.params.sort
        const items = await Items.find({});
        if(underprice==='price' && category!=='category'){
            const items = await Items.find({type:category});
            if(sort==="HL"){
                const sorted = items.sort((a, b) => b.price - a.price);
                return  response.status(200).json(sorted);
            }
            else if(sort==="LH"){
                const sorted =items.sort((a, b) => a.price - b.price);
                return  response.status(200).json(sorted);
            }
            else{
                return  response.status(200).json(items);
            }
        }
        if(underprice!=='price' && category==='category'){
            const items = await Items.find({price:{ $lte: underprice}});
            if(sort==="HL"){
                const sorted = items.sort((a, b) => b.price - a.price);
                return  response.status(200).json(sorted);
            }
            else if(sort==="LH"){
                const sorted =items.sort((a, b) => a.price - b.price);
                return  response.status(200).json(sorted);
            }
            else{
                return  response.status(200).json(items);
            }
        }

        if(underprice!=='price' && category!=='category'){
            const items = await Items.find({type:category,price:{ $lte: underprice}});
            if(sort==="HL"){
                const sorted = items.sort((a, b) => b.price - a.price);
                return  response.status(200).json(sorted);
            }
            else if(sort==="LH"){
                const sorted =items.sort((a, b) => a.price - b.price);
                return  response.status(200).json(sorted);
            }
            else{
                return  response.status(200).json(items);
            }
            
        }
        if(sort==="HL"){
            const sorted = items.sort((a, b) => b.price - a.price);
            return  response.status(200).json(sorted);
        }
        else if(sort==="LH"){
            const sorted =items.sort((a, b) => a.price - b.price);
            return  response.status(200).json(sorted);
        }
        else{
            return  response.status(200).json(items);
        }
    } catch (error) {
        response.status(500).json(error);
    }
}
export const getItemPreview = async (request, response) => {
    try {
        const data = request.params.id;
        const items = await Items.find({ _id: data });
        response.status(200).json(items);
    } catch (error) {
        response.status(500).json(error);
    }
}
export const DeleteProduct = async (request, response) => {
    try {
        const data = request.params.id;
        const deleteitem = await Items.deleteMany({ _id: data });
        await cart.findOneAndDelete({ productId: data })
        response.status(200).json(deleteitem);
    } catch (error) {
        response.status(500).json(error);
    }
}