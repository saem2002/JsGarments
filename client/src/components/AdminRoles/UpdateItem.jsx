
import React, { useEffect, useState } from 'react'
import Updatecard from './Updatecard';
import Sidebar from './Sidebar';
import { checkAlltransactions, getItems } from '../../service/Api';
import { cartQuantChange } from '../../actions/ActionIndex';
import { useDispatch, useSelector } from 'react-redux';
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Link, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const UpdateItem = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const myStatecartQuantity = useSelector((state) => state.CartQuantitystatechange);
    const [Itemdata, setItemdata] = useState([]);
    const [count, setcount] = useState(4);
    const [divvisibility, setdivvisibility] = useState('');
    const [divvisibility2, setdivvisibility2] = useState('none');
    const [changestate, setchangestate] = useState(-1);

    useEffect(() => {


        const allItems = async () => {
            setchangestate(-1)

            const data = await getItems();
            setItemdata(data);
            setchangestate(0)
        }
        const countData = () => {

            if (count >= Itemdata.length - 1) {
                setdivvisibility('none')
            }
            else {
                setdivvisibility('')
            }
            if (count > 5) {
                setdivvisibility2('')

            } else {
                setdivvisibility2('none')
            }

        }
        allItems();
        countData();
    }, [Itemdata.length, count, myStatecartQuantity.data]);
    const changecartquant = () => {
        dispatch(cartQuantChange());
    }

    return (
        <>
            <Sidebar />
            <div className='AddItem_main_div'>

                <div className='main_div_update'>
                    <div className='Mid_div_update'>

                        <Link to="/AdminDashboard/UpdateItem/shirt/10000" style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                            <div className='mid_div_child'  >       shirt    </div>
                        </Link>



                        <Link to="/AdminDashboard/UpdateItem/lower/10000" style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                            <div className='mid_div_child'  >
                                Lower   </div>
                        </Link>


                        <Link to="/AdminDashboard/UpdateItem/tshirt/10000" style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                            <div className='mid_div_child' >
                                T-shirt </div>
                        </Link>

                    </div>
                   

                </div>
                <div className='heading_recent'>  Recently Added</div>

                <div className='Update_card_map'>
                    {Itemdata.length === 0 && changestate === -1 && <CircularProgress color="inherit" />}
                    {Itemdata && [...Itemdata].reverse().map((data, index) =>
                        <>

                            {index <= count &&
                                <>

                                    <Updatecard state={'true'}
                                        index={index}
                                        fabric={data.fabric}
                                        stock={data.stock}
                                        type={data.type} img={data.images} id={data._id}
                                        price={data.price}
                                        quantity={data.quantity} color={data.color} changecartquant={changecartquant} />
                                    <div className='line_update' ></div>

                                </>
                            }



                        </>
                    )}
                </div>

                <div style={{ display: `${divvisibility}` }}><ArrowCircleDown style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(count + 10)} /></div>


                <div style={{ display: `${divvisibility2}` }}><ArrowCircleUp style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(4)} /></div>

            </div>
        </>
    )
}

export default UpdateItem;