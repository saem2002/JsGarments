import React, { useState } from 'react';
import './HomePage.css'
import {useNavigate} from 'react-router-dom'
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const ItemCard = ({ img, type, price ,id,color,index}) => {
  const navigate = useNavigate();
  const goToProduct=(id)=>{
     navigate(`/ItemPreview/${id}`)
  }


  return (
    
    <>
    <div  className="ItemCard">
    <div className="flip-card">
  <div className="flip-card-inner">
    <div  className="flip-card-front">
      <img data-aos="fade"   src={img} alt="Avatar" className='Itemcard_image'  />
      <div style={{fontFamily:'system-ui',display:'flex',flexDirection:'column',marginTop:'2vh'}} >

      <div    style={{fontSize: 'calc(0.6vw + 0.6vh + 1vmin)',fontWeight:'bold',borderBottom: '1px rgba(0, 0, 0, 0.13) solid'}}>{type}</div>
      
      <div   style={{color:'grey', marginTop:'1vh'}}>{color}</div>

      <div   style={{fontSize: 'calc(0.6vw + 0.6vh + 1vmin)',fontWeight:'bold'}}> <CurrencyRupeeIcon sx={{fontSize: 'calc(0.6vw + 0.6vh + 1vmin)'}} />{price} </div>
      <div   style={{  fontSize: 'calc(0.4vw + 0.4vh + 1vmin)',color:'grey', marginTop:'1vh'}}>Price inclusive of all taxes</div>
      </div>
    </div>
    <div className="flip-card-back"  >
      <ArrowCircleRightTwoToneIcon onClick={()=>goToProduct(id)}  style={{fontSize:'50px', cursor:'pointer',border:'none'}} />
    
    </div>
  </div>
</div>
    

    </div>




    </>
  );
};

export default ItemCard;
