import axios from 'axios';


//  export const url =  'https://jsgarments.herokuapp.com';
export const url = 'http://localhost:9000';



export const addUser = async (data,closebackdrop) => {
    try {
        
        let response = await axios.post(`${url}/add`, data);
        if(response.status===200){
            closebackdrop();
        }
      
    
        return response.data;
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}




export const getUsers = async () => {
    try {
        let response = await axios.get(`${url}/users`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const addItems = async (data, call, waitfunc, call2) => {
    try {
        let response = await axios.post(`${url}/Items`, data);
        call2();
        if (response.status === 200) {
            waitfunc();
        }
        if (response.status === 201) {
            call();
            waitfunc();
        }
        return response.data;
    } catch (error) {
        console.log('Error while calling addImage API ', error);
    }
}
export const updateItems = async (data, call, call2,call3) => {
    try {
        let response = await axios.post(`${url}/updateItems`, data);
        call2();
        if (response.status === 200) {
            call();
            call2();
            call3();
        }
  
        return response.data;
    } catch (error) {
        console.log('Error while calling addImage API ', error);
    }
}
export const getItems = async () => {
    try {
        let response = await axios.get(`${url}/getallItems`);

        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const getItemPreview = async (id) => {
    try {
        let response = await axios.get(`${url}/getItemPreview/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const addItemToCart = async (data, id, call, call2, call3) => {

    try {
        let response = await axios.post(`${url}/addtocart/${id}`, data);
        call3();
        if (response.status === 202) {
            call();

        }
        if (response.status === 203) {
            call2();
        }
        return response.data
    } catch (error) {

        console.log('Error while calling addUser API ', error);
    }
}
export const DeleteProduct = async (id, call) => {
    try {
        let response = await axios.get(`${url}/DeleteProduct/${id}`);
        call();
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const getsubcategory = async (subcategory,price,sort) => {
    try {
        let response = await axios.get(`${url}/category/${subcategory}/${price}/${sort}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const decreaseCartQuantity = async (data, id, call, call2) => {

    try {
        let response = await axios.post(`${url}/decreaseCartQuantity/${id}`, data);
        if (response.status === 200) {
            call2();
        }
        return response.data
    } catch (error) {
        call();
        console.log('Error while calling addUser API ', error);
    }
}

export const getCartItems = async (id) => {
    try {
        let response = await axios.get(`${url}/getCartItems/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const totalamount = async (id) => {
    try {
        let response = await axios.get(`${url}/totalamount/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}


export const SetStockOfProduct = async (id,cartitems,handleclearcart) => {
    try {
        let response = await axios.post(`${url}/setstock/${id}`,cartitems);
        if (response.status===200){
            handleclearcart();
        }
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}




export const Addtoorders = async (totalPrice, personName,googleId,cartitems) => {

    try {
        let response = await axios.post(`${url}/orders/${totalPrice}/${personName}/${googleId}`,cartitems);

        return response.data
    } catch (error) {
        console.log('Error while calling addUser API ', error);
    }
}

export const getorders = async () => {
    try {
        let response = await axios.get(`${url}/orders`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const getorderofUser = async (id) => {
    try {
        let response = await axios.get(`${url}/order/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const payNow = async (totalPrice, handleclearcart,personName,googleId,cartitems) => {
    let response = await axios.get(`${url}/totalamount/${googleId}`);

    const options = {
        "key": "rzp_test_KOc8kOcSvHaXTf", // Enter the Key ID generated from the Dashboard
        "amount": totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Js Garments",
        "description": "Test Transaction",
        "image": "https://res.cloudinary.com/saemarora/image/upload/v1649508529/zote97goswqtilwxekya.png",
        "order_id": response.data.googleId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response) {
            window.alert("successfully")
            handleclearcart()
            Addtoorders(totalPrice,personName,googleId,cartitems)

            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);

    });

}
