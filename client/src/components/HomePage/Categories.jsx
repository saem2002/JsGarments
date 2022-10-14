import Aos from 'aos';
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Categories = ({ setstoringdivindex }) => {
    
    return (
        <>
            <div data-aos="fade-up"  className='category_section'>
        
                <div  onClick={() => setstoringdivindex(-1)}>
                    <Link to="/category/lower/10000"  >
                        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>



                            <div className='circle_category1'></div>

                        </div></Link>
                    <div data-aos="fade-up" className='category_name' style={{ cursor: 'pointer' }}>LOWER</div></div>
                <div onClick={() => setstoringdivindex(-1)}>
                    <Link to="/category/shirt/10000"  >
                        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>



                            <div className='circle_category2'></div>

                        </div></Link>
                    <div  data-aos="fade-up" className='category_name' style={{ cursor: 'pointer' }}>SHIRT</div></div>
                <div  onClick={() => setstoringdivindex(-1)}>
                    <Link to="/category/tshirt/10000"  >
                        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>



                            <div className='circle_category3'></div>

                        </div>
                    </Link>
                    <div  data-aos="fade-up" className='category_name' style={{ cursor: 'pointer' }}>T-SHIRT</div></div>
                  </div>
         
        </>
    )
}

export default Categories