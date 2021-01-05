import styles from '../styles/List.module.css'

import { useState } from 'react'
import { connect } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import Card from './Card'
import CardEditor from './CardEditor'
import ListEditor from './ListEditor'

import shortid from 'shortid'

const List = (props) => {
    const [editingTitle, setEditingTitle] = useState(false)
    const [title, setTitle] = useState(props.list.title)
    const [addingCard, setAddingCard] = useState(false)

    const { list, index } = props

    const toggleAddingCard = () => setAddingCard(!addingCard)

    const addCard = async (cardText) => {
        const { listId, dispatch } = props

        toggleAddingCard()

        const cardId = shortid.generate()

        dispatch({
            type: 'ADD_CARD',
            payload: { cardText, cardId, listId }
        })
    }

    const toggleEditingTitle = () => setEditingTitle(!editingTitle)

    const handleChangeTitle = (e) => setTitle(e.target.value)

    const editListTitle = async () => {
        const { listId, dispatch } = props

        toggleEditingTitle()

        dispatch({
            type: 'CHANGE_LIST_TITLE',
            payload: { listId, listTitle: title }
        })
    }

    const deleteList = async () => {
        const { listId, list, dispatch } = props

        dispatch({
            type: 'DELETE_LIST',
            payload: { listId, cards: list.cards }
        })
    }

    return (
        <Draggable draggableId={list._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.List}>
                    {editingTitle ? (
                        <ListEditor
                            list={list}
                            title={title}
                            handleChangeTitle={handleChangeTitle}
                            saveList={editListTitle}
                            onClickOutside={editListTitle}
                            deleteList={deleteList}
                        />
                    ) : (
                        <div
                            className={styles.ListTitle}
                            onClick={toggleEditingTitle}>
                            {list.title}
                        </div>
                    )}

                    <Droppable droppableId={list._id}>
                        {(provided) => (
                            <div ref={provided.innerRef}>
                                {list.cards &&
                                    list.cards.map((cardId, index) => (
                                        <Card
                                            key={cardId}
                                            cardId={cardId}
                                            index={index}
                                            listId={list._id}
                                        />
                                    ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {addingCard ? (
                        <CardEditor
                            onSave={addCard}
                            onCancel={toggleAddingCard}
                            adding
                        />
                    ) : (
                        <div
                            className={styles.ToggleAddCard}
                            onClick={toggleAddingCard}>
                            + Add Card
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    )
}

const mapStateToProps = (state, ownProps) => ({
    list: state.listsById[ownProps.listId]
})

export default connect(mapStateToProps)(List)
