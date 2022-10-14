import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { DeleteProduct, updateItems } from '../../service/Api';
import { useSelector } from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import { Alert, TextField } from '@mui/material';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import ClearIcon from '@mui/icons-material/Clear';
import UpgradeIcon from '@mui/icons-material/Upgrade';
const Updatecard = ({ type, price, id, color, changecartquant, fabric, state, stock,img }) => {
  const [open1, setOpen1] = React.useState(false);
  const [images, setImages] = useState([]);


  const handleClick1 = () => {
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const [select, setselect] = useState(`${state}`)
  const myState = useSelector((state) => state.AddUser);
  const navigate = useNavigate();
  const goToProduct = (id) => {
    navigate(`/ItemPreview/${id}`)
  }
  const [open, setOpen] = React.useState(false);

  const [product, setProduct] = useState({
    type: `${type}`,
    price: `${price}`,
    fabric: `${fabric}`,
    stock: `${stock}`,
    color: `${color}`,

  });

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const ifupdated = () => {
    setselect('true')
  }

  const postDetails = async (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append('Image', images);
    data.append('id', id)
    data.append('type', product.type);
    data.append('price', product.price);
    data.append('fabric', product.fabric);
    data.append('stock', product.stock);
    data.append('color', product.color);
    await updateItems(data, handleClick, changecartquant, ifupdated);

  }
  let Name, value
  const handlechange = (e) => {
    Name = e.target.name;
    value = e.target.value;
    setProduct({ ...product, [Name]: value })

  }


  return (

    <>


      <div className='updatecard'>

        {select === 'false' && <>
          <div className='Inputs_update'>
          <div ><img className='update_image' src={img}></img>
       
          {/* <div> <input name="Image" type="file" onChange={(e) => setImages(e.target.files[0])}></input></div> */}
          </div>
            <div className='Item_details Inputs_update_textfield'>  <TextField style={{width:'5vw'}}  name="type" id="standard-basic" label="Type" variant="standard" color="success" value={product.type} onChange={handlechange} /></div>
            <div className='Item_details Inputs_update_textfield'> <TextField style={{width:'5vw'}} name="color" id="standard-basic" label="Color" variant="standard" color="success" value={product.color} onChange={handlechange} /></div>
            <div className='Item_details Inputs_update_textfield'><TextField style={{width:'5vw'}} name="fabric" id="standard-basic" label="Fabric" variant="standard" color="success" value={product.fabric} onChange={handlechange} /></div>

            <div className='Item_details Inputs_update_textfield'>  <TextField style={{width:'5vw'}} name="price" id="standard-basic" label="Price" variant="standard" color="success" value={product.price} onChange={handlechange} /></div>
            <div className='Item_details Inputs_update_textfield'><TextField style={{width:'5vw'}} name="stock" id="standard-basic" label="Stock" variant="standard" color="success" value={product.stock} onChange={handlechange} /></div>
            <div className='Item_details_icons_update' style={{width:'4vw',marginRight:'1vw'}}> <ClearIcon  onClick={() => { select === 'true' ? setselect('false') : setselect('true') }}
              style={{ cursor: 'pointer', border: 'none' }}>
            </ClearIcon></div>
            <div className='Item_details_icons_update' onClick={postDetails}>
              <UpgradeIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }}
                style={{ cursor: 'pointer', border: 'none' }}>
              </UpgradeIcon>
            </div>
          </div>


        </>}
        {select === 'true' && <>
        <div  ><img className='update_image' src={img}></img></div>
          <div className='Item_details' style={{ fontWeight: 'bold',textTransform:'uppercase' }}>{type}</div>
          <div className='Item_details' style={{fontWeight: 'bold' }}>{color}</div>
          <div className='Item_details' style={{ fontWeight: 'bold' }}>{fabric} </div>

          <div className='Item_details' style={{ fontWeight: 'bold' }}>Rs.{price} </div>
          <div className='Item_details' style={{ fontWeight: 'bold' }}>{stock} </div>
          <div className='Item_details_icons'>   <CreateSharpIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }} style={{ cursor: 'pointer', border: 'none' }}>Details</CreateSharpIcon>   </div>
          <div className='Item_details_icons'> {myState.data && myState.data.email === 'sa873463@gmail.com' && <DeleteOutlineIcon onClick={() => DeleteProduct(id, changecartquant)} style={{ cursor: 'pointer', border: 'none',marginLeft:'-2.7vw' }}>Delete Item</DeleteOutlineIcon>}
          </div> </> }

      </div>





    </>
  );
};

export default Updatecard;
