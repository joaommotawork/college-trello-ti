import styles from '../styles/ListEditor.module.css'

import { useRef, useEffect } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const ListEditor = (props) => {
    const ref = useRef()

    const { title, handleChangeTitle, deleteList } = props

    const onEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            props.saveList()
        }
    }

    const handleClick = (e) => {
        const node = ref.current

        if (node?.contains(e.target)) {
            return
        }

        props.onClickOutside()
    }

    useEffect(() => {
        document.addEventListener('click', handleClick, false)
        return () => {
            document.removeEventListener('click', handleClick, false)
        }
    }, [document])

    return (
        <div className={styles.ListTitleEdit} ref={ref}>
            <TextareaAutosize
                className={styles.ListTitleTextarea}
                placeholder="Enter list title..."
                value={title}
                onChange={handleChangeTitle}
                onKeyDown={onEnter}
                style={{ width: deleteList ? 220 : 245 }}
            />
            {deleteList && (
                <div className={styles.EditButtons}>
                    <div
                        tabIndex="0"
                        className={styles.EditButton}
                        style={{ backgroundColor: '#EA2525', marginLeft: 0 }}
                        onClick={deleteList}>
                        Delete
                    </div>
                    <div
                        tabIndex="0"
                        className={styles.EditButton}
                        style={{ backgroundColor: '#5aac44' }}
                        onClick={() => props.saveList()}>
                        Save
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListEditor
