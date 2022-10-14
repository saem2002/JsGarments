
import React from 'react';
import { useSelector } from 'react-redux';
import { payNow, SetStockOfProduct } from '../../service/Api';
import './Cart.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Snackbar } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const Cart = ({ open, setopen, message, cartitems, handleAddItem, handleDecrease, handleclearcart, handledeleteItem }) => {
  const totalPrice = cartitems.reduce((price, item) => price + item.quantity * item.price, 0)
  const myState = useSelector((state) => state.AddUser);



  const [state, setState] = React.useState({
    snackopen: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen(false);
  };

  return (
    <>

      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>


      {cartitems.length === 0 ? <>Add something in cart</> :
              
      <>
        <div className='heading_cart'><div>My cart</div></div>
        <div className='Main_cart_div'>

          <div className='left_div'>

                {
                  cartitems.map((item) => {

                    return (

                      <div key={item._id} className='Data_Cart'  >
                        <div className='cart_main_div'>
                          <div className='Mid_div_cart'>
                            <div style={{ width: '30%', height: '100%' }}>
                              <img src={item.images} alt="LOADING" className='Cart_image' ></img>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '0 10%', width: '50%' }}>
                              <div style={{ fontSize: 'calc(1vw + 1vh )', fontWeight: 'bold', textTransform: 'capitalize' }}> {item.type} </div>
                              <div style={{ fontSize: 'calc(1vw + 1vh )', fontWeight: 'bold', textTransform: 'capitalize' }}> {item.color} </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(1vw + 1vh )', fontWeight: 'bold' }}>{item.price}RS

                                <div><CloseIcon /></div>
                                <Button onClick={() => handleDecrease(item)} className='incdecbutton_cart '><RemoveIcon /></Button>
                                <div >{item.quantity}</div>
                                <Button onClick={() => handleAddItem(item)}

                                  className='incdecbutton_cart '><AddIcon /></Button>

                              </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <div onClick={() => handledeleteItem(item)}
                                style={{ fontSize: 'calc(1vw + 1vh )', cursor: 'pointer', textAlign: 'center', fontWeight: 'bolder' }}>
                                <DeleteOutlineIcon /> </div>

                              <div
                                style={{ fontSize: 'calc(1vw + 1vh )', textAlign: 'center', cursor: 'pointer', fontWeight: 'bolder' }}> {item.quantity * item.price}RS </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    )
                  })
                }
          </div>
          
            <div className='rightDiv'>
              <div className='rightsubtotal'>
                <p style={{ fontWeight: 'bolder' }} > Cash on delivelry available</p>
                <p > Total amount : {totalPrice}Rs</p>
                <p>Total items : {cartitems.length} </p>
                <p style={{ cursor: 'pointer' }}
                  onClick={handleclearcart}>Clear All cart</p>

                <Button
                  variant="contained" color="success"
                  onClick={() => { payNow(totalPrice, () => SetStockOfProduct(myState.data.googleId, cartitems, handleclearcart), myState.data.name, myState.data.googleId,cartitems) }}>
                  Proceed payment</Button>

              </div>    </div>


        </div ></>}

    </>
  )
};

export default Cart;
