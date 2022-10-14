import React from 'react';

import {useNavigate} from 'react-router-dom'
import { DeleteProduct } from '../../service/Api';
import { useSelector } from 'react-redux';

const AdminItemcard = ({ img, type, price ,id,color,changecartquant}) => {
  const myState =useSelector((state)=>state.AddUser);
  const navigate = useNavigate();
  const goToProduct=(id)=>{
     navigate(`/ItemPreview/${id}`)
  }
  

  return (
    
    <>
    <div className="ItemCard">
    <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src={img} alt="Avatar" className='Itemcard_image'  />
      <div style={{fontWeight:'bold'}}>{type}</div>
      <div style={{marginBottom:'10px'}}>{color}</div>

   
      <div style={{fontWeight:'bold'}}>Rs.{price} </div>
    </div>
    <div class="flip-card-back">
      <p style={{textTransform:'capitalize'}}> {type}</p> 
      <p>{price}Rs</p> 
      <button onClick={()=>goToProduct(id)} style={{cursor:'pointer',border:'none'}}>Details</button>
    {myState.data && myState.data.email === 'sa873463@gmail.com' && <button onClick={()=>DeleteProduct(id,changecartquant)} style={{cursor:'pointer',border:'none'}}>Delete Item</button>}  
     
    </div>
  </div>
</div>
    

    </div>




    </>
  );
};

export default AdminItemcard;
