import { useDispatch, useSelector } from 'react-redux'

import { setCurrentChannel } from '../slices/chatSlice'
import { openModal } from '../slices/modalSlice'

export const Channels = () => {
    const dispatch = useDispatch()
    const channels = useSelector(
        (state) => state.chat.channels
    )
    const setCurrentChannelId = useSelector(
        (state) => state.chat.CurrentChannelId
    )
    return (
        <div>
            {channels.map((channel) => (
                <div key={channel.id}>
                    <button type='button'
                    className={
                        channel.id = CurrentChannelId
                            ? 'btn btn-secondary'
                            : 'btn'
                    }
                    onClick={() => 
                        dispatch(setCurrentChannel(channel.id))
                    }>#{channel.name}</button>
                    {channel.removable && (
                        <>
                            <button
                            onClick={() => 
                                dispatch(
                                    openModal({
                                        type: 'rename',
                                        channelId: channel.id
                                    })
                                )
                            }>rename</button>
                            <button onClick={() =>
                                dispatch(
                                    openModal({
                                        type: 'remove',
                                        channelId: channel.id
                                    })
                                )
                            }>remove</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
