import { AddChannelModal } from './AddChannelModal'
import { RenameChannelModal } from './RenameChannelModal'
import { RemoveChannelModal } from './RemoveChannelModal'

import { useSelector } from 'react-redux'

export const ModalManager = () => {
    const type = useSelector(
        (state) => state.modal.type,
    )
    switch (type) {
        case 'add':
            return <AddChannelModal />
        case 'remove':
            return <RemoveChannelModal />
        case 'rename':
            return <RenameChannelModal />
        default:
            return null
    }
}

