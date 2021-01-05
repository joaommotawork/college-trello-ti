import styles from '../styles/CardEditor.module.css'

import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import EditButtons from './EditButtons'

const CardEditor = (props) => {
    const [text, setText] = useState(props.text ? props.text : '')

    const { onSave, onCancel, onDelete, adding } = props

    console.log(text)

    const handleChangeText = (event) => {
        console.log(event.target.value)
        setText(event.target.value)
    }

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            props.onSave(text)
        }
    }

    return (
        <div className={styles.EditCard}>
            <div className={styles.Card}>
                <TextareaAutosize
                    autoFocus
                    className={styles.EditCardTextarea}
                    placeholder="Text Card"
                    value={text}
                    onChange={handleChangeText}
                    onKeyDown={onEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? 'Add New Card' : 'Save'}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    )
}

export default CardEditor
