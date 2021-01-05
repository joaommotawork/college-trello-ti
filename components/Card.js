import styles from '../styles/Card.module.css'

import { useState } from 'react'
import { connect } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import CardEditor from './CardEditor'

const Card = (props) => {
    const [hover, setHover] = useState(false)
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState('')

    const { card, index } = props

    const startHover = () => setHover(true)
    const endHover = () => setHover(false)

    const startEditing = () => {
        setHover(false)
        setEditing(true)
        setText(props.card.text)
    }

    const endEditing = () => {
        setHover(false)
        setEditing(false)
    }

    const editCard = async (text) => {
        const { card, dispatch } = props

        endEditing()

        dispatch({
            type: 'CHANGE_CARD_TEXT',
            payload: { cardId: card._id, cardText: text }
        })
    }

    const deleteCard = async () => {
        const { listId, card, dispatch } = props

        dispatch({
            type: 'DELETE_CARD',
            payload: { cardId: card._id, listId }
        })
    }

    if (!editing) {
        return (
            <Draggable draggableId={card._id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.Card}
                        onMouseEnter={startHover}
                        onMouseLeave={endHover}>
                        {hover && (
                            <div className={styles.CardIcons}>
                                <div
                                    className={styles.CardIcon}
                                    onClick={startEditing}>
                                    Edit
                                </div>
                            </div>
                        )}

                        {card.text}
                    </div>
                )}
            </Draggable>
        )
    } else {
        return (
            <CardEditor
                text={card.text}
                onSave={editCard}
                onDelete={deleteCard}
                onCancel={endEditing}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    card: state.cardsById[ownProps.cardId]
})

export default connect(mapStateToProps)(Card)
