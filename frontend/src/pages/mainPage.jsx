import { useEffect } from "react"
import { useDispatch } from "react-redux"

import socket from "../socket"
import { addMessage, addChannelSocket, removeChannelSocket, renameChannelSocket } from "../slices/chatSlice"

import { MessageForm } from "../Components/MessageForm"
import { Messages } from "../Components/Messages"

import { ModalManager } from "../Components/ModalManager"
import { Channels } from '../Components/Channels'

export const MainPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('newMessage', (payload) => {
            dispatch(addMessage(payload))
        })
        socket.on('newChannel', (payload) => {
            dispatch(addChannelSocket(payload))
        })
        socket.on('removeChannel', (payload) => {
            dispatch(removeChannelSocket(payload.id))
        })
        socket.on('renameChannel', (payload) => {
            dispatch(renameChannelSocket(payload))
        })
        return () => {
            socket.off('newMessage')
            socket.off('newChannel')
            socket.off('removeChannel')
            socket.off('renameChannel')
        }
    }, [dispatch])
    return (
        <div>
            <Channels />

            <Messages />

            <MessageForm />

            <ModalManager />
        </div>
    )
}
