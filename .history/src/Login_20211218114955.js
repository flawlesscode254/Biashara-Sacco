import Button from '@mui/material/Button'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import Logo from "./money.svg"
import Nav from './Nav'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
    }
    return (
        <div className="login">
            <Nav />
            <div className="login__logog">
                <img 
                    src={Logo}
                    alt="" 
                />
            </div>
            <Button
                type="submit"
                onClick={signIn}
            >
                Sign In
            </Button>
        </div>
    )
}

export default Login