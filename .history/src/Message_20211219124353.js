import { Card, CardContent, Typography } from '@mui/material'
import React, { forwardRef } from 'react';
import './Message.css'
import {auth} from "./firebase"

const Message = forwardRef(({ message, email, username}, ref) => {
    return (
        <div ref={ref} className={`message ${email === auth?.currentUser?.email && `message__user`}`}>
            <p className="message__name">{email === auth?.currentUser?.email ? username : "You"}</p>
            <Card className={email === auth?.currentUser?.email ?  : "message__guestCard"}>
                <CardContent>
                    <Typography
                    color="white"
                    variant="h5"
                    component="h2"
                    >
                         {message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message