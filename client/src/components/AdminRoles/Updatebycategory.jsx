import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getsubcategory } from '../../service/Api';
import Updatecard from './Updatecard';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { cartQuantChange } from '../../actions/ActionIndex';
import Sidebar from './Sidebar';
import { CircularProgress } from '@mui/material';
const Updatebycategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myStatecartQuantity = useSelector((state) => state.CartQuantitystatechange);
  const { subcategory } = useParams();
  const { Rs } = useParams();
  const [count, setcount] = useState(4);
  const [changestate, setchangestate] = useState(-1);
  const [allsubcategory, setallsubcategory] = useState('');
  useEffect(() => {

    const findall = async () => {
      setallsubcategory('')
      setchangestate(-1)

      const res = await getsubcategory(subcategory, Rs);

      setallsubcategory(res);


      setchangestate(0)


    }

    findall();





  }, [subcategory, myStatecartQuantity.data, window.location.pathname]);
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

      <div style={{ backgroundColor: '#f2f2f0' }}>
        <div className='back_update' onClick={() => navigate('/AdminDashboard/UpdateItem')}><KeyboardBackspaceIcon sx={{ fontSize: 'calc(0.8em + 2.5vw)' }} /></div>




        <div className='AddItem_main_div'>
          <div className='main_div_update'>
            <div className='Mid_div_update' >

              <Link to={`/AdminDashboard/UpdateItem/${subcategory}/10000`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div className='mid_div_child_cat_sub'  > {subcategory} </div>
              </Link>




            </div>
          </div>
          <div className='main_div_update'>
            <div className='Mid_div_update'>

              <Link to={`/AdminDashboard/UpdateItem/${subcategory}/300`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div className='mid_div_child_cat' style={{ background: storingdivindex === 0 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} onClick={() => fadeselected(0)}  > Under 300 </div>
              </Link>



              <Link to={`/AdminDashboard/UpdateItem/${subcategory}/500`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div onClick={() => fadeselected(1)} style={{ background: storingdivindex === 1 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} className='mid_div_child_cat'  >
                  Under 500  </div>
              </Link>


              <Link to={`/AdminDashboard/UpdateItem/${subcategory}/1000`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div onClick={() => fadeselected(2)} style={{ background: storingdivindex === 2 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} className='mid_div_child_cat' >
                  Under 1000 </div>
              </Link>
              <Link to={`/AdminDashboard/UpdateItem/${subcategory}/10000`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div onClick={() => fadeselected(3)} style={{ background: storingdivindex === 3 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} className='mid_div_child_cat' >
                  Under 10000 </div>
              </Link>

            </div>
          </div>
          <div className='Update_card_map'>

            {allsubcategory.length === 0 && changestate === -1 && <CircularProgress color="inherit" />}
            {allsubcategory.length === 0 && changestate === 0 && <h1>Sorry {subcategory} are not available right now</h1>}

            {allsubcategory && allsubcategory.map((data, index) =>
              <>


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




              </>
            )}
          </div>


        </div>
      </div>
    </>
  )
}

export default Updatebycategory