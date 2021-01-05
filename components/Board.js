import styles from '../styles/Board.module.css'

import { connect } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { useState } from 'react'

import List from './List'
import AddList from './AddList'

const Board = (props) => {
    const [addingList, setAddingList] = useState(false)

    const toggleAddingList = () => setAddingList(!addingList)

    const { board } = props

    const handleDragEnd = ({ source, destination, type }) => {
        if (!destination) return

        const { dispatch } = props

        if (type === 'COLUMN') {
            if (source.index !== destination.index) {
                dispatch({
                    type: 'MOVE_LIST',
                    payload: {
                        oldListIndex: source.index,
                        newListIndex: destination.index
                    }
                })
            }
            return
        }

        if (
            source.index !== destination.index ||
            source.droppableId !== destination.droppableId
        ) {
            dispatch({
                type: 'MOVE_CARD',
                payload: {
                    sourceListId: source.droppableId,
                    destListId: destination.droppableId,
                    oldCardIndex: source.index,
                    newCardIndex: destination.index
                }
            })
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                {(provided, _snapshot) => (
                    <div className={styles.Board} ref={provided.innerRef}>
                        {board.lists.map((listId, index) => {
                            return (
                                <List
                                    listId={listId}
                                    key={listId}
                                    index={index}
                                />
                            )
                        })}

                        {provided.placeholder}

                        <div className={styles.AddList}>
                            {addingList ? (
                                <AddList toggleAddingList={toggleAddingList} />
                            ) : (
                                <div
                                    onClick={toggleAddingList}
                                    className={styles.AddListButton}>
                                    + Add New List
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const mapStateToProps = (state) => ({ board: state.board })

export default connect(mapStateToProps)(Board)
