import {
    removeChannel,
} from '../slices/chatSlice';

export const RemoveChannelModal = () => {
    return (
        <button onClick={() => 
            dispatch(removeChannel(channelId))
        }>Удалить</button>
    )
}
