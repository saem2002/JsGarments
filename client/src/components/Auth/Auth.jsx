import React from 'react';
import { GoogleLogin } from 'react-google-login'
import { clientId } from '../constants/data'
import { addUser } from '../../service/Api';
import { useDispatch } from 'react-redux'
import { authUser } from '../../actions/ActionIndex';
import './Auth.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLoginSuccess = async (res) => {
        localStorage.setItem('isloggedin',JSON.stringify(true));
        dispatch(authUser(res.profileObj))
        await addUser(res.profileObj);
        navigate('/')
    }
    const onLoginFailure = () => {

        console.log("login failed")
    }
    
    return (
        <>
    
           
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
                    clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'} />

            </div>
        </>
    )
};

export default Auth;
