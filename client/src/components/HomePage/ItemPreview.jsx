import { Alert, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { addItemToCart, getItemPreview } from '../../service/Api';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Navbar from '../Navbar/Navbar'

import './ItemPreview.css'
import { cartQuantChange } from '../../actions/ActionIndex';

const ItemPreview = ({ handleAddItem}) => {
    const dispatch = useDispatch();
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>

            You have already added this item in cart.
            <Button color="secondary" size="small" onClick={handleClose}>
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => navigate('/cart')}
                ><LocalMallIcon />


                </IconButton>
                <CloseIcon fontSize="small" />
            </Button>



        </React.Fragment>
    );

    const [Itemdata, setItemdata] = useState([]);
    const [windowwidth] = useState(window.innerWidth);
    const { id } = useParams();

    const myState = useSelector((state) => state.AddUser);
    


    useEffect(() => {
        const allItems = async () => {
            const data = await getItemPreview(id);
            setItemdata(data);
        }

  
            allItems();


    }, [setItemdata, id]);

    const changecartquant = () => {
        dispatch(cartQuantChange());
    }

    return (
        <>
      
            <div className='ItemPreview_Div_Home'>
                {Itemdata.length === 0 &&
                    <>
                        <Stack spacing={1}>
                            <div className='main_div_skeleton' >

                                {windowwidth > 900 ?
                                    <>

                                        <div > <Skeleton sx={{ bgcolor: 'grey.900', height: '90vh', width: '30vw' }} variant="rectangular" /></div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70vw' }}>
                                            <div><Skeleton variant="text" height='10vh' width='30vw' /></div>
                                            <div>  <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" height='70vh' width='60vw' /></div>
                                            <div>  <Skeleton variant="text" height='10vh' width='10vw' /></div>
                                        </div>
                                    </> : <>
                                        <div style={{ height: '40vh' }} > <Skeleton sx={{ bgcolor: 'grey.900', height: '40vh', width: '100vw' }} variant="rectangular" /></div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '50vh', width: '100vw' }}>
                                            <div ><Skeleton variant="text" height='5vh' width='40vw' style={{ marginTop: '5vh' }} /></div>
                                            <div>  <Skeleton sx={{ bgcolor: 'grey.800' }} variant="text" height='30vh' width='90vw' /></div>
                                            <div>  <Skeleton variant="text" height='5vh' width='30vw' /></div>
                                        </div>
                                    </>}
                            </div>
                        </Stack>

                    </>
                }

                {Itemdata && Itemdata.map((data) =>
                    <>


                        <div className='ItemPreview_left_div'>

                            <div>    <img src={data.images} className='Item_pic' alt="Loading" /></div>

                        </div>
                        <div className='ItemPreview_right_div'>
                            <p className='Item_name'>
                                {data.type}
                            </p>
                            <div className='Item_data' >
                                <div >  <span>Price</span> {data.price} Rs</div>
                                <div>  <span>Fabric</span>{data.fabric}</div>
                                <div>  <span>Quantity </span>{data.stock}</div>
                                <div>  <span>color </span>{data.color}</div>

                            </div>
                            <div>

                                <Snackbar style={{ zIndex: '9999' }} open={open} autoHideDuration={5000} onClose={handleClose} action={action} />
                                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                                    <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                                        Item added to your cart succesfully
                                    </Alert>
                                </Snackbar>


                            </div>

                            {myState.data && data.stock !== "0" ?
                                <button className='addtoCartBtn'
                                    // onClick={() => {
                                    //     addItemToCart(data, myState.data.googleId, handleClick, handleClick1, changecartquant);
                                    //     dispatch(cartQuantChange())
                                    // }}
                                    onClick={() => handleAddItem(data)}
                                    >
                                    Add to cart</button> :
                                    <>
                                
                                <Button   variant="outlined" color="error"
                                >{myState.data ?  "Item not available right now" :
                                 <span onClick={()=>navigate('/login')}>Please login to add items</span>} </Button>
                                </>
                            }
                        </div>

                    </>
                )}
            </div>

        </>)
};

export default ItemPreview;
