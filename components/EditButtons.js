import styles from '../styles/EditButtons.module.css'

const EditButtons = ({ handleSave, saveLabel, handleDelete, handleCancel }) => (
    <div className={styles.EditButtons}>
        <div
            tabIndex="0"
            className={styles.EditButton}
            style={{ backgroundColor: '#5aac44' }}
            onClick={handleSave}>
            {saveLabel}
        </div>
        {handleDelete && (
            <div
                tabIndex="0"
                className={styles.EditButton}
                style={{ backgroundColor: '#EA2525', marginLeft: 0 }}
                onClick={handleDelete}>
                Delete
            </div>
        )}
        <div
            tabIndex="0"
            className={styles.EditButton}
            style={{ backgroundColor: '#cccccc', marginLeft: 0 }}
            onClick={handleCancel}>
            Cancel
        </div>
    </div>
)

export default EditButtons
