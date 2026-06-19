import { useEffect } from "react"
import { useDispatch } from "react-redux"

import socket from "../socket"
import { addMessage } from "../slices/chatSlice"

import { MessageForm } from "../Components/MessageForm"
import { Messages } from "../Components/Messages"

export const MainPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('newMessage', (payload) => {
            dispatch(addMessage(payload))
        })
        return () => {
            socket.off('newMessage')
        }
    }, [dispatch])
    return (
        <div>
            <Messages />  
            <MessageForm />
        </div>
    )
}
