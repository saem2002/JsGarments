import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import Navbar from './components/Navbar/Navbar'
import Auth from './components/Auth/Auth';

import HomePage from './components/HomePage/HomePage';
import { authUser } from './actions/ActionIndex';
import { addUser } from './service/Api';
import ItemPreview from './components/HomePage/ItemPreview';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import ScrollToTop from './components/ScrollToTop';
import AdminDashboard from './components/AdminRoles/AdminDashboard';
import AddItem from './components/AdminRoles/AddItem';
import UpdateItem from './components/AdminRoles/UpdateItem';
import Cart from './components/cart/Cart'
import { useEffect, useState } from 'react';
import CategoryWise from './components/Category/CategoryWise';
import Order from './components/AdminRoles/Orders';
import OrderPage from './components/AdminRoles/OrderPage';
import { useDispatch, useSelector } from 'react-redux';

import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { clientId } from './components/constants/data'

import Updatebycategory from './components/AdminRoles/Updatebycategory';

function App() {
  const [progress, setProgress] = useState(0)
  const [cartitems, setcartitems] = useState(() => {
    const localdata = localStorage.getItem('cartitems');
    return localdata ? JSON.parse(localdata) : [];
  })
  const [open, setopen] = useState(false);
  const [message, setmessage] = useState('');

  const dispatch = useDispatch();
  const onLoginSuccess = async (res) => {
    dispatch(authUser(res.profileObj))
    await addUser(res.profileObj);
  }
  const onLoginFailure = () => {
    console.log("login failed")
  }
  const myState = useSelector((state) => state.AddUser);
  const handleAddItem = async (product) => {
    console.log(product)
    const exist = cartitems.find((item) => item._id === product._id)
    console.log(exist)
    if (exist) {

      console.log(product.quantity)
      if (`${exist.quantity}` === exist.stock) {
        setopen(true)
        setmessage(`You can not add more than ${exist.stock} quantity of ${exist.color} coloured ${exist.fabric} ${exist.type}`)
      }
      setcartitems(cartitems.map((item) => item._id === product._id ?
        { ...exist, quantity: exist.quantity < exist.stock ? exist.quantity + 1 : exist.quantity } :
        item)
      )


    } else {
      setcartitems([...cartitems, { ...product, quantity: 1 }]);
    }


  }

  const handleDecrease = (product) => {
    const exist = cartitems.find((item) => item._id === product._id)
    if (exist.quantity === 1) {
      setcartitems(cartitems.filter((item) => item._id !== product._id));
    }
    else {
      setcartitems(
        cartitems.map((item => item._id === product._id ? { ...exist, quantity: exist.quantity - 1 } : item))
      )
    }
  }
  const handledeleteItem = (product) => {

    setcartitems(cartitems.filter((item) => item._id !== product._id));

  }
  const handleclearcart = () => {
    setcartitems([])
  }

  useEffect(() => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems))
  }, [cartitems])

  const [storingdivindex, setstoringdivindex] = useState(-1);
  return (
    <>

      <Router>





        <ScrollToTop />


        <LoadingBar
          height={1}
          color='#f2f2f0'
          progress={progress}
          onLoaderFinished={() => setProgress(0)} />
        <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <GoogleLogin
            clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'} />

        </div>
        <Navbar cartitems={cartitems} setstoringdivindex={setstoringdivindex} />
        {myState && myState.data && myState.data.email === ('sa873463@gmail.com' || 'kvipen164@gmail.com') &&
          <>

            <Routes>
              <Route path="/AdminDashboard" element={<AdminDashboard />} />
              <Route path="/AdminDashboard/AddItem" element={<AddItem />} />
              <Route path="/AdminDashboard/UpdateItem" element={<UpdateItem />} />
              <Route path="/AdminDashboard/orders" element={<Order />} />
              <Route path="/AdminDashboard/UpdateItem/:subcategory/:Rs" element={<Updatebycategory />} />
              shirt
            </Routes>
          </>

        }
        
          <>
           
            <Routes >



              <Route exact path="/" element={<HomePage setstoringdivindex={setstoringdivindex} />} />

              <Route path="/Order/:id" element={<OrderPage />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/cart" element={<Cart open={open} setopen={setopen} message={message} cartitems={cartitems} handledeleteItem={handledeleteItem} setcartitems={setcartitems} handleAddItem={handleAddItem} handleDecrease={handleDecrease} handleclearcart={handleclearcart} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/category/:subcategory/:Rs" element={<CategoryWise setProgress={setProgress} setstoringdivindex={setstoringdivindex} storingdivindex={storingdivindex} />} />
              <Route path="/ItemPreview/:id" element={<ItemPreview handleAddItem={handleAddItem} />} />


            </Routes ></>




        <Footer />

      </Router>
    </>


  );
}

export default App;
