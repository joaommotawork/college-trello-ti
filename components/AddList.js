import styles from '../styles/AddList.module.css'

import { useState } from 'react'
import { connect } from 'react-redux'
import ListEditor from './ListEditor'
import shortid from 'shortid'
import EditButtons from './EditButtons'

const AddList = (props) => {
    const [title, setTitle] = useState('')

    const handleChangeTitle = (e) => setTitle(e.target.value)

    const { toggleAddingList } = props

    const createList = async () => {
        const { dispatch } = props

        toggleAddingList()

        dispatch({
            type: 'ADD_LIST',
            payload: { listId: shortid.generate(), listTitle: title }
        })
    }

    return (
        <div className={styles.AddListEditor}>
            <ListEditor
                title={title}
                handleChangeTitle={handleChangeTitle}
                onClickOutside={toggleAddingList}
                saveList={createList}
            />

            <EditButtons
                handleSave={createList}
                saveLabel={'Add List'}
                handleCancel={toggleAddingList}
            />
        </div>
    )
}

export default connect()(AddList)
