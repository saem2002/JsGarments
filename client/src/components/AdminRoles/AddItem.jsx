import { Checkbox, Chip, CircularProgress, Stack, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { cartQuantChange } from '../../actions/ActionIndex';
import { addItems } from '../../service/Api';
import Sidebar from './Sidebar';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FaceIcon from '@mui/icons-material/Face';
const AddItem = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [images, setImages] = useState([]);
    const [waitforres, setwaitforres] = useState('');
    const [waitforrespro, setwaitforrespro] = useState('none');
    const [product, setProduct] = useState({
        type: "",
        price: "",
        fabric: "",
        stock: "",
        color: "",

    });
    const waitfunc = () => {
        setwaitforres('')
        setwaitforrespro('none')
    }
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [typeselect, settypeselect] = useState('');


    const postDetails = async (e) => {

        e.preventDefault();
        setwaitforres('none')
        setwaitforrespro('')
        const data = new FormData();
        data.append('Image', images);
        data.append('type', typeselect);
        data.append('price', product.price);
        data.append('fabric', product.fabric);
        data.append('stock', product.stock);
        data.append('color', product.color);
        await addItems(data, handleClick, waitfunc, changecartquant);
        if (waitforres === '') {
            settypeselect('');
            setImages([]);
            setProduct({
                type: "",
                price: "",
                fabric: "",
                stock: "",
                color: "",
            });
            setstoringdivindex(-1)
        }

    }
    let Name, value
    const handlechange = (e) => {
        Name = e.target.name;
        value = e.target.value;
        setProduct({ ...product, [Name]: value })

    }
    const changecartquant = () => {
        dispatch(cartQuantChange());
    }
    const [storingdivindex, setstoringdivindex] = useState(-1);
    const fadeselected = (num) => {
        setstoringdivindex(num);
    }
    return (
        <>
            <Sidebar />
            <form style={{ overflow: 'hidden' }} onSubmit={postDetails}>
                <div className='Form_item_div'>

                    <p className='Heading_addItem'>Add New Item Here</p>
                    <Stack direction="row" spacing={2} sx={{ marginBottom: '3vh' }}>
                        <div onClick={() => { settypeselect('shirt'); fadeselected(0) }}><Chip variant={storingdivindex === 0 ? "" : "outlined"} color={storingdivindex === 0 ? "success" : "primary"} icon={<EmojiEmotionsIcon />} label="Shirt" clickable /></div>
                        <div onClick={() => { settypeselect('lower'); fadeselected(1) }}><Chip variant={storingdivindex === 1 ? "" : "outlined"} color={storingdivindex === 1 ? "success" : "primary"} icon={<EmojiEmotionsIcon />} label="Lower" clickable /></div>
                        <div onClick={() => { settypeselect('tshirt'); fadeselected(2) }}> <Chip variant={storingdivindex === 2 ? "" : "outlined"} color={storingdivindex === 2 ? "success" : "primary"} icon={<EmojiEmotionsIcon />} label="T-shirt" clickable /></div>
                    </Stack>

                    <div className='AddItem_textfields'><TextField name="price" id="standard-basic" label="Price" variant="standard" color="success" value={product.price} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="fabric" id="standard-basic" label="Fabric(Used to make)" variant="standard" color="success" value={product.fabric} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="stock" id="standard-basic" label="Stock(quantity left)" variant="standard" color="success" value={product.stock} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="color" id="standard-basic" label="Color" variant="standard" color="success" value={product.color} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'> <input name="Image" type="file" onChange={(e) => setImages(e.target.files[0])}></input></div>
                    <div className='AddItem_textfields'> <button type='submit' style={{ display: `${waitforres}` }}>submit</button></div>
                    <div><CircularProgress color="inherit" style={{ display: `${waitforrespro}` }} /></div>
                </div>

            </form>
        </>
    )
}

export default AddItem