import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import './Footer.css'
import { useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button, Menu, MenuItem } from '@mui/material';
import { GoogleLogout } from 'react-google-login'
import { clientId } from '../constants/data'
import {useDispatch, useSelector} from 'react-redux'
import { authUser } from '../../actions/ActionIndex';

const Footer = () => {

    const navigate = useNavigate();
    const push = (data)=>{
        navigate(`/${data}`)
    }
    // window.onscroll = function () { scrollFunction() };
    // function scrollFunction() {
    //     if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {


    //         document.getElementsByClassName('navdivstyle')[0].style.fontSize = 'medium';
    //     } else {
    //         document.getElementsByClassName('navstyle')[0].style.width = "100%";
    //         document.getElementsByClassName('navdivstyle')[0].style.fontSize = 'large';
    //         document.getElementsByClassName('navstyle')[0].style.borderTopLeftRadius = "0px";
    //         document.getElementsByClassName('navstyle')[0].style.borderBottomRightRadius = "0px";
    //     }
    // }
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

    };
    



    return (
        <>
            <div className='Main_Footer' >

                <BottomNavigation sx={{ width: 500 }} style={{ backgroundColor: 'black' }} >
                    <BottomNavigationAction
                        label="Recents"
                        value="recents"
                        style={{ color: 'white' }}
                        icon={<HomeIcon />}
                        onClick={() => navigate(`/`)}
                    />
                    <BottomNavigationAction
                        label="Favorites"
                        value="favorites"
                        style={{ color: 'white' }}
                        icon={<ShoppingCartIcon />}
                        onClick={() => navigate(`/cart`)}
                    />
                    <BottomNavigationAction
                        label="Nearby"
                        value="nearby"
                        style={{ color: 'white' }}
                        icon={<AccountBoxIcon />}
                        onClick={handleClick}
                    />
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
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {myState.data ? <>


                             <div onClick={()=>navigate('/profile')}><MenuItem onClick={handleClose}>{myState.data.name}</MenuItem></div>
                             <div onClick={()=>navigate('/profile')}>  <MenuItem onClick={handleClose}>Profile</MenuItem></div>
                                <MenuItem onClick={handleClose}>
                                    <GoogleLogout className="brand" clientId={clientId}
                                        buttonText="Logout" style={{ visibility: 'hidden' }}
                                        onLogoutSuccess={onSignoutSuccess}
                                    ></GoogleLogout>
                                </MenuItem>
                            </>
                                :
                        
                                <div onClick={()=>navigate('/login')}> <MenuItem style={{ height: '10vh' }} onClick={handleClose}>Log in</MenuItem>

                               </div>}
                            
                        </Menu>
                    </div>
                    <BottomNavigationAction
                    style={{color: 'white', display: `${myState.data && myState.data.email === 'sa873463@gmail.com' ? '' : 'none'}`}}
                        label="Folder" value="folder" onClick={() => navigate(`/AddItem`)}
                         icon={<AddBoxIcon />} />
                </BottomNavigation>

            </div>
        </>
    )
};

export default Footer;
