import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './Profile.css'

const Profile = () => {

  const myState = useSelector((state) => state.AddUser);
  return (
    <>
  
      <div className='Profile_main_div'>
        <div className='Mid_div_profile'>
          
            {myState.data &&
            <>
              <div style={{ width: '30%', height: '100%' }}>
              <img src={myState.data.imageUrl} alt="LOADING" style={{ height: '30vh', width: '100%', borderRadius: '8px 0 0 8px' }}></img>
       </div>
          <div style={{ padding: '5%' }}>
            <p style={{ fontSize: 'calc(1vw + 1vh )' }}>Your username - <span style={{ fontWeight: 'bold' }}>{myState.data.name}</span> </p>
            <p style={{ fontSize: 'calc(1vw + 1vh )' }}>Your Gmail id - <span style={{ fontWeight: 'bold' }}>{myState.data.email}</span> </p>
            </div></>
            }


      
        </div>
      </div>
    </>
  )
};

export default Profile;
