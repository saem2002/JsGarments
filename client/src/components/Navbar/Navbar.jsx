import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import logo from '../../JSPICS/logo.gif'
import { Backdrop, Button, IconButton, LinearProgress, Menu, MenuItem, Stack } from '@mui/material';
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { clientId } from '../constants/data'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, cartQuant } from '../../actions/ActionIndex';
import { addUser, getCartItems } from '../../service/Api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Aos from 'aos';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const Navbar = ({ cartitems,setstoringdivindex }) => {
  const [openNavbar, setopenNavbar] = useState(true);
  const [AdminNavbar, setAdminNavbar] = useState(false);

  const navigate = useNavigate();
  const cartcount = useSelector((state) => state.CartQuantity)
  const myStatecartQuantity = useSelector((state) => state.CartQuantitystatechange)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.AddUser);
  const onSignoutSuccess = () => {
    navigate('/login')
    console.clear();
    dispatch(authUser(''));
    localStorage.setItem('isloggedin', JSON.stringify(false))

  };
  const [Open, setOpen] = React.useState(true);
  const call2 = () => {
    setOpen(false)
  }
  const onLoginSuccess = async (res) => {
    dispatch(authUser(res.profileObj))
    await addUser(res.profileObj, call2);
  }
  const onLoginFailure = () => {
    console.log("login failed")
  }


  useEffect(() => {
    const total = async () => {
      const data = await getCartItems(`${myState.data.googleId}`);

      if (data) {
        dispatch(cartQuant(data.length))
      } else {
        dispatch(cartQuant(0));
      }

    }
    const checkuserloggedinornot = () => {
      const localdata = localStorage.getItem('isloggedin');

      if (JSON.parse(localdata) !== true) {
        setOpen(false)
      }
    }

    total();
    checkuserloggedinornot();


  }, [myStatecartQuantity.data, cartcount.data, dispatch, myState.data]);
  useEffect(() => {
    const checkisAdmin = () => {
      const path = window.location.pathname;
      if (path.includes('AdminDashboard')) {
        setopenNavbar(false)
        setAdminNavbar(true)
      } else {
        setopenNavbar(true)
        setAdminNavbar(false)
      }

    }
    checkisAdmin();
  }, [window.location.pathname]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <Backdrop
        sx={{
          color: 'black'
          , backgroundColor: ' #f2f2f0', zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={Open}

      >
        <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <GoogleLogin
            clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'} />

        </div>


        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>

            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
          </Stack>

          <span className='Auth_loading_text'>JS</span>

          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>

            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
          </Stack>
        </div>

      </Backdrop>
      {openNavbar &&
        <div className='Navbar_div'>


          <NavLink to="/" className='Navbar_Navlinks_Div'> JS</NavLink>
<div onClick={()=>setstoringdivindex(-1)}>
          <NavLink to="/category/shirt/10000" className='Navbar_Navlinks_Div' >
            Shirt
          </NavLink></div>
          <div onClick={()=>setstoringdivindex(-1)}>
          <NavLink to="/category/lower/10000" className='Navbar_Navlinks_Div'>
            Lower
          </NavLink></div>
          <div onClick={()=>setstoringdivindex(-1)}>
          <NavLink to="/category/tshirt/10000" className='Navbar_Navlinks_Div'>
            T-shirts
          </NavLink></div>
          <div style={{
            display:
              `${myState && myState.data && myState.data.email === ('sa873463@gmail.com' || 'kvipen164@gmail.com') ? '' : 'none'}`
          }} >

            <NavLink to="/AdminDashboard/AddItem" className='Navbar_Navlinks_Div'>
              AdminDashboard
            </NavLink>
          </div>

          <div className='Navbar_Navlinks_Menu'>

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <AccountBoxIcon style={{ color: 'white' }} />
            </Button>
            <NavLink to="/cart" className=''>

              <IconButton sx={{ color:'white' }} className='Navbar_cart_icon' aria-label="cart">
                <StyledBadge color='secondary' badgeContent={cartitems && cartitems.length} >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>

            </NavLink>
            <Menu
              id="basic-menu"

              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {myState && myState.data ? <><NavLink to='/profile' className="AccountLinks"><MenuItem onClick={handleClose}>{myState.data.name}</MenuItem></NavLink>
                <NavLink to={`/order/${myState.data.googleId}`} className="AccountLinks"><MenuItem onClick={handleClose}>Your orders</MenuItem></NavLink>
                <NavLink to='/Profile' className="AccountLinks" ><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
                <NavLink to='/login' className="AccountLinks" >
                  <MenuItem onClick={handleClose}>

                    <GoogleLogout className="brand"
                      clientId={clientId}
                      buttonText="Logout"
                      style={{ visibility: 'hidden' }}
                      onLogoutSuccess={onSignoutSuccess}
                    ></GoogleLogout>


                  </MenuItem></NavLink></>
                :
                <NavLink to='/login' className="AccountLinks"><MenuItem style={{ height: '10vh' }} onClick={handleClose}>Log in</MenuItem></NavLink>}


            </Menu>
            <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <GoogleLogin
                clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'} />

            </div>
          </div>


        </div>

      }
      {AdminNavbar &&
        <div className='Navbar_div_Admin'>

          <div className='Navbar_Navlinks_Menu'>
            <div style={{

              backgroundColor: '#1B2F3D', height: '10vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: 'whitesmoke'
            }}>
              <EmojiEmotions />
              <div>AdminDashboard</div>
            </div>

            <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <GoogleLogin
                clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'} />

            </div>
          </div>


        </div>
      }
    </>
  )
};

export default Navbar;
