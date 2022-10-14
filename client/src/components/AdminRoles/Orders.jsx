
import React, { useEffect, useState } from 'react'
import Updatecard from './Updatecard';
import Sidebar from './Sidebar';
import { getorders } from '../../service/Api';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { useNavigate } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const Order = () => {
    const navigate = useNavigate();
    const [Itemdata, setItemdata] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [select, setselect] = React.useState(-1);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {


        const allItems = async () => {

            const data = await getorders();
            setItemdata(data);
        }

        allItems();

    }, []);

    const changeToyear = (Time) => {
        const date = new Date(Time);
        return date.getFullYear()

    }
    const changeTodate = (Time) => {
        const date = new Date(Time);
        return date.getDate()

    }
    const changeTotime = (Time) => {
        const date = new Date(Time);
        return date.toLocaleTimeString('en-US')
    }
    return (
        <>
            <Sidebar />
            <div >
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div style={{ backgroundColor: 'black', color: 'whitesmoke' }} >
                        <div style={{ display: 'flex', marginBottom: '2px' }}>
                            <div style={{ width: '12vw', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>Image</div>
                            <div style={{ width: '8vw', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>Quantity</div>
                            <div style={{ width: '8vw', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>Price</div>
                            <div style={{ width: '8vw', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>See product</div>
                        </div>
                        {Itemdata && Itemdata.map((data, index) => <>

                            {index === select && data.orderlist.map((s) => <>
                                <div style={{ display: 'flex', backgroundColor: 'black', color: 'whitesmoke' }}>
                                    <div style={{ width: '12vw', height: '20vh', fontFamily: 'emoji', boxShadow: '0px 1px 1px whitesmoke' }}><img style={{ width: '12vw', height: '20vh' }} src={s.images}></img></div>
                                    <div style={{ width: '8vw', height: '20vh', fontFamily: 'emoji', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>{s.quantity}</div>
                                    <div style={{ width: '8vw', height: '20vh', fontFamily: 'emoji', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>{s.price}</div>
                                    <div onClick={()=>navigate(`/Itempreview/${s._id}`)} style={{ width: '8vw',cursor:'pointer', height: '20vh', fontFamily: 'emoji', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}><InsertLinkIcon /></div>
                                </div>
                            </>)}

                        </>)}
                        <div style={{ display: 'flex', marginBottom: '2px' }}>
                            <div style={{ width: '20vw', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>Total - Price</div>

                            <div style={{ width: '16vw', textAlign: 'center', boxShadow: '0px 1px 1px whitesmoke' }}>
                                {Itemdata && Itemdata.map((item, index) => <>{index === select && item.Price}</>)} Rs
                            </div>
                        </div></div>
                </Dialog>
            </div>

            <div className='AddItem_main_div'>
                <div className='heading_order'><div>All orders placed</div></div>
                <div className='Update_card_map_order'>
                    <div className='updatecard' style={{ width: '80%' }}>
                        <div style={{ width: '30%', fontFamily: 'emoji', fontWeight: 'bold' }}>Name</div>

                        <div style={{ width: '20%', fontFamily: 'emoji', fontWeight: 'bold' }}>Date</div>
                        <div style={{ width: '25%', fontFamily: 'emoji', fontWeight: 'bold' }}>Time</div>

                        <div style={{ width: '20%', fontWeight: 'bold' }}>Rs</div>

                        <div style={{ cursor: 'pointer', width: '20%', fontWeight: 'bold' }}>Info</div>

                    </div>
                    {Itemdata && Itemdata.map((data, index) => <>

                        <div className='updatecard' style={{ width: '80%' }}>
                            <div style={{ width: '30%', fontFamily: 'emoji' }}>{data.personName}</div>

                            <div style={{ width: '20%', fontFamily: 'emoji' }}>{changeTodate(data.updatedAt)}/{changeToyear(data.updatedAt)}</div>
                            <div style={{ width: '25%', fontFamily: 'emoji' }}>{changeTotime(data.updatedAt)}</div>

                            <div style={{ width: '20%' }}>{data.Price}<CurrencyRupeeIcon /></div>

                            <div onClick={() => { setselect(index); handleClickOpen() }} style={{ cursor: 'pointer', width: '20%' }}>More</div>

                        </div>

                    </>
                    )}
                </div></div>
        </>
    )
}

export default Order;