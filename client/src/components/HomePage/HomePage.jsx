import React, { useEffect, useState } from 'react';

import { filters, getItems, getsubcategory } from '../../service/Api';
import './HomePage.css'
import ItemCard from './ItemCard';
import { Carousel } from 'react-bootstrap';
import tshirt from '../../JSPICS/shirt1.jpg'
import Aos from 'aos';
import "aos/dist/aos.css";
import Categories from './Categories';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Checkbox } from '@mui/material';



const HomePage = ({ setstoringdivindex }) => {

    const [Itemdata, setItemdata] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
    const [count, setcount] = useState(9);
    const [change, setchange] = useState(true);
    const [category, setcategory] = useState('category');
    const [checked1, setchecked1] = useState(-1);

    const [price, setprice] = useState('price');
    const [checked2, setchecked2] = useState(-1);
    const [sort, setsort] = useState('sort');
    const [checked3, setchecked3] = useState(-1);

    const [divvisibility, setdivvisibility] = useState('');
    const [divvisibility2, setdivvisibility2] = useState('none');
    useEffect(() => {
        Aos.init({ duration: 1500, once: 'true' });

    }, []);

    useEffect(() => {

        const allItems = async () => {
            //For all data of getitems
            // const data =  await getItems();
            const data = await getsubcategory(category, price, sort);
            setfilterdata(data);
        }
        const countData = () => {

            if (count >= Itemdata.length - 1) {
                setdivvisibility('none')
            }
            else {
                setdivvisibility('')
            }
            if (count > 10) {
                setdivvisibility2('')

            } else {
                setdivvisibility2('none')
            }

        }

        allItems();

        countData();

    }, [Itemdata.length, count, change]);
    let value;
    const handlechange_category = (e) => {

        value = e.target.value;
        setcategory(value)

    }
    let value2;;
    const handlechange_price = (e) => {

        value2 = e.target.value;
        setprice(value2)

    }
    let value3;
    const handlechange_sort = (e) => {

        value3 = e.target.value;
        setsort(value3)
    }

    const postdata = async () => {

        const alldata = await getsubcategory(category, price, sort);
        setfilterdata(alldata);
    }
    const clearAllFilters = async () => {
        setcategory('category');
        setprice('price');
        setsort('sort');
        setchecked1(-1);
        setchecked2(-1);
        setchecked3(-1);
        setchange(change === true ? false : true)

    }

    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        style={{
                            height: '60vh', width: '100%', objectFit: 'cover',
                            backgroundPosition: 'top', backgroundSize: '50vw'
                        }}
                        className="d-block w-100"
                        src={tshirt}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{
                            height: '60vh', width: '100%', objectFit: 'cover',
                            backgroundPosition: 'top', backgroundSize: '50vw'
                        }}
                        className="d-block w-100"
                        src={tshirt}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{
                            height: '60vh', width: '100%', objectFit: 'cover',
                            backgroundPosition: 'top', backgroundSize: '50vw'
                        }}
                        className="d-block w-100"
                        src={tshirt}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div style={{ width: '100%', backgroundColor: '#FFFBF7', display: 'flex', justifyContent: 'center' }}>   <Categories setstoringdivindex={setstoringdivindex} /></div>
            <div className='heading_home'><div  >Our All Best Deals</div></div>
            <div className='Main_Div_Home'>
                <div className='Accordian_home'>
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <div className='Heading_Accordian'>Products</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div onChange={handlechange_category}>
                                <Checkbox
                                    onClick={() => setchecked1(1)}
                                    checked={checked1 === 1 ? true : false}
                                    size="small"
                                    name="category" value="shirt"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />

                                <label for="html"> Shirt</label><br></br>
                                <Checkbox
                                    onClick={() => setchecked1(2)}
                                    checked={checked1 === 2 ? true : false}
                                    size="small"
                                    name="category" value="lower"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label for="html">Lower</label><br></br>
                                <Checkbox
                                    onClick={() => setchecked1(3)}
                                    checked={checked1 === 3 ? true : false}
                                    size="small"
                                    name="category" value="tshirt"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label for="html">T-shirt</label><br></br>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <div className='Heading_Accordian'>Price</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div onChange={handlechange_price}>

                                <Checkbox
                                    onClick={() => setchecked2(1)}
                                    checked={checked2 === 1 ? true : false}
                                    size="small"
                                    name="Price" value="300"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />

                                <label for="html"> Under 300</label><br></br>
                                <Checkbox
                                    onClick={() => setchecked2(2)}
                                    checked={checked2 === 2 ? true : false}
                                    size="small"
                                    name="Price" value="500"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label for="html">Under 500</label><br></br>
                                <Checkbox
                                    onClick={() => setchecked2(3)}
                                    checked={checked2 === 3 ? true : false}
                                    size="small"
                                    name="Price" value="1000"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label for="html">Under 1000</label><br></br>
                                <Checkbox
                                    onClick={() => setchecked2(4)}
                                    checked={checked2 === 4 ? true : false}
                                    size="small"
                                    name="Price" value="10000"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label for="html">Under 10000</label><br></br>

                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"

                        >
                            {/* <div className='Heading_Accordian'>Size</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        > */}
                            <div className='Heading_Accordian'>Sort</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div onChange={handlechange_sort}>
                                <Checkbox
                                    onClick={() => setchecked3(1)}
                                    checked={checked3 === 1 ? true : false}
                                    size="small"
                                    name="sort" value="HL"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />

                                <label for="html"> High to low</label><br></br>
                                <Checkbox
                                    onClick={() => setchecked3(2)}
                                    checked={checked3 === 2 ? true : false}
                                    size="small"
                                    name="sort" value="LH"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <label for="html">Low to high</label><br></br>

                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className='Accordian_opt'>
                        
                            
                       
                        <div> <Button variant="contained" color="success" className='Accordian_opt_btn' onClick={() => postdata()} >Apply</Button></div>
                        <div> <Button variant="outlined" color="error" className='Accordian_opt_btn' onClick={clearAllFilters} >clear</Button></div>
                    </div>

                </div>
                {/* <div className='Items_Div_Home'>

                    {Itemdata.length === 0 && "No items are added yet"}
                    {Itemdata && Itemdata.length > 0 && Itemdata.map((data, index) =>
                        <>

                            {index <= count &&
                                <div className='ItemCard_div'>

                                    <ItemCard type={data.type} img={data.images} id={data._id} index={index}
                                        color={data.color} fabric={data.fabric} price={data.price} quantity={data.quantity} />

                                </div>
                            }


                        </>
                    )}


                </div> */}
                <div className='Items_Div_Home'>

                    {filterdata.length === 0 && "No items are added yet"}
                    {filterdata && filterdata.length > 0 && filterdata.map((data, index) =>
                        <>

                            {index <= count &&
                                <div className='ItemCard_div'>

                                    <ItemCard type={data.type} img={data.images} id={data._id} index={index}
                                        color={data.color} fabric={data.fabric} price={data.price} quantity={data.quantity} />

                                </div>
                            }


                        </>
                    )}


                </div>
                {/* <div style={{ display: 'flex' }}>
                    <div style={{ display: `${divvisibility}` }}><ArrowCircleDownIcon style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(count + 10)} /></div>


                    <div style={{ display: `${divvisibility2}` }}><ArrowCircleUpIcon style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => setcount(9)} /></div>
                </div> */}
            </div>


        </>)
};

export default HomePage;
