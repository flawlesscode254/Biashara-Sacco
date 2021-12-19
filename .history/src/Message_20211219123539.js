import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react';
import './Message.css'
import {auth} from "./"

const Message = forwardRef(({ message, email}, ref) => {
    return (
        <div ref={ref} className={`message ${isUser && `message__user`}`}>
            <p className="message__name">{!isUser && `${message.username || 'Unknown User'}`}</p>
            <Card className={isUser ? "message__userCard" : "message__guestCard"}>
                <CardContent>
                    <Typography
                    color="white"
                    variant="h5"
                    component="h2"
                    >
                         {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message