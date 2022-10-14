const initialState = {data:0};

const CartQuantity = (state = initialState, action) => {
    switch (action.type) {
        case "CARTQUANT":
            const { data } = action.payload;
            return {data:data}
        default: return state;
    }
}
const initialState2 = {data:0};

const CartQuantitystatechange = (state = initialState2, action) => {
    switch (action.type) {
        case "CARTQUANTCHANGE":
            
            return {data:state.data+1}
        default: return state;
    }
}
export  {CartQuantitystatechange};
export default CartQuantity;
