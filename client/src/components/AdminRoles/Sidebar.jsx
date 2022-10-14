import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import logo from '../../JSPICS/logo.gif'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { NavLink } from 'react-router-dom';
import home from '../../JSPICS/home.png'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
const Sidebar = () => {


    return (
        <>

            <Box
                className='AddItem_sidebar'
                role="presentation">




                <List>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />






                        </ListItem>   </NavLink>
                </List>

                <List>
                    <NavLink to="/AdminDashboard/AddItem" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add new item" />






                        </ListItem>   </NavLink>
                </List>

                <NavLink to="/AdminDashboard/UpdateItem" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                    <List>
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <TipsAndUpdatesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Update existing item" />


                        </ListItem>
                    </List>
                </NavLink>

                <NavLink to="/AdminDashboard/orders" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                    <List>
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <AlignVerticalBottomIcon />
                            </ListItemIcon>
                            <ListItemText primary="All orders" />


                        </ListItem>
                    </List>
                </NavLink>

            </Box>



        </>
    )
}

export default Sidebar