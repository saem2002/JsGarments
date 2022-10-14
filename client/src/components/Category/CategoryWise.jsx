import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getsubcategory } from '../../service/Api';
import ItemCard from '../HomePage/ItemCard'
const CategoryWise = ({ setProgress,setstoringdivindex,storingdivindex }) => {

    const { subcategory, Rs } = useParams();
    const [changestate, setchangestate] = useState(-1);
    const [allsubcategory, setallsubcategory] = useState('');
    useEffect(() => {
        
        const findall = async () => {
           
            setallsubcategory('')
            setchangestate(-1)
            setProgress(30)
            console.log(subcategory)
            console.log(Rs)

            const res = await getsubcategory(subcategory, Rs);
            setProgress(60)

            setallsubcategory(res);
            setProgress(100)
            setchangestate(0)
        }

        findall();
    }, [subcategory, Rs, setProgress]);
   
    const fadeselected = (num) => {
        setstoringdivindex(num);
    }
    return (
        <>
                  <div className='main_div_update' style={{backgroundColor:'#FFFBF7'}}>
            <div className='Mid_div_update'>

              <Link to={`/category/${subcategory}/300`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div className='mid_div_child_cat' style={{ background: storingdivindex === 1 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} onClick={() => fadeselected(0)}  > Under 300 </div>
              </Link>



              <Link to={`/category/${subcategory}/500`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div onClick={() => fadeselected(1)} style={{ background: storingdivindex === 1 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} className='mid_div_child_cat'  >
                  Under 500  </div>
              </Link>


              <Link to={`/category/${subcategory}/1000`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div onClick={() => fadeselected(2)} style={{ background: storingdivindex === 2 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} className='mid_div_child_cat' >
                  Under 1000 </div>
              </Link>
              <Link to={`/category/${subcategory}/10000`} style={{ color: 'whitesmoke', textDecoration: 'none' }}  >
                <div onClick={() => fadeselected(3)} style={{ background: storingdivindex === 3 ? "linear-gradient(to right, #42275a 0%, #734b6d 51%, #42275a 100%)" : "linear-gradient(#1B2F3D, #0d4875)" }} className='mid_div_child_cat' >
                  Under 10000 </div>
              </Link>

            </div>
          </div>
            <div className='Main_Div_Home'>
                <div className='Items_Div_category'>

                    {allsubcategory.length === 0 && changestate === -1 && <>

                        <div style={{ margin: '5vh 0vw' }} > <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>
                        <div style={{ margin: '5vh 0vw' }}> <Skeleton sx={{ bgcolor: 'grey.600' }} variant="rectangular" width={'18vw'} height={'50vh'} /> </div>


                    </>}


                  {allsubcategory.length === 0 && changestate === 0 && <h1>Sorry {subcategory} are not available right now</h1>}
                        {allsubcategory && allsubcategory.map((data, index) => (
                            <>
                                <div >

                                    <ItemCard type={data.type} img={data.images} id={data._id} index={index}
                                        color={data.color} fabric={data.fabric} price={data.price} quantity={data.quantity} />

                                </div>
                            </>
                        ))}</div></div>

        </>
    )
}

export default CategoryWise