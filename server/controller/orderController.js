
import order from "../modal/Order.js";



export const addtorders = async (request, response) => {
    const allitems = request.body;
    console.log(allitems);
    const add = new order({
        googleId: request.params.googleId,
        personName: request.params.personName,
        Price: request.params.Price,
        orderlist:request.body
    });
await add.save();

response.status(200).json("added");


}
export const getorders = async (request, response) => {
    try {
        const allorders = await order.find({});
        response.status(200).json(allorders);
    } catch (error) {
        response.status(500).json(error);
    }
}
export const getorderofUser = async (request, response) => {
    try {
        const allorders = await order.find({ googleId: request.params.id });
        response.status(200).json(allorders);
    } catch (error) {
        response.status(500).json(error);
    }
}
