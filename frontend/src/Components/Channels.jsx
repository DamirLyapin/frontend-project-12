import { useDispatch, useSelector } from 'react-redux'

import { setCurrentChannel } from '../slices/chatSlice'
import { openModal } from '../slices/modalSlice'
import { useTranslation } from 'react-i18next';


export const Channels = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const channels = useSelector(
        (state) => state.chat.channels
    )
    const currentChannelId = useSelector(
        (state) => state.chat.CurrentChannelId
    )
    return (
        <div>
            {channels.map((channel) => (
                <div key={channel.id}>
                    <button type='button'
                    className={
                        channel.id === CurrentChannelId
                            ? 'btn btn-secondary'
                            : 'btn'
                    }
                    onClick={() => 
                        dispatch(currentChannel(channel.id))
                    }>#{channel.name}</button>
                    {channel.removable && (
                        <>
                            <button
                                type="button"
                                className={
                                    channel.id === currentChannelId
                                    ? 'btn btn-secondary'
                                    : 'btn'
                                }
                                onClick={() =>
                                    dispatch(setCurrentChannel(channel.id))
                                }
                                >
                                # {channel.name}
                            </button>
                            <button
                            onClick={() => 
                                dispatch(
                                    openModal({
                                        type: 'rename',
                                        channelId: channel.id
                                    })
                                )
                            }>{t('channels.rename')}</button>
                            <button onClick={() =>
                                dispatch(
                                    openModal({
                                        type: 'remove',
                                        channelId: channel.id
                                    })
                                )
                            }>{t('channels.remove')}</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}
