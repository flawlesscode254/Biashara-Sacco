import Button from '@mui/material/Button'
import React from 'react'
import './Login.css'
import { auth, provider } from './firebase'
import Logo from "./money.svg"
import SubNavigation from './SubNavigation'

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider)
    }
    return (
        <div>
            <SubNavigation />
        </div>
        <div className="login">
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