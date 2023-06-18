import React, { useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { BoardContainer } from '../styles/Board.styles'
import CardList from '../components/CardList'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addList, fetchBoardTask } from '../redux/features/board_slice'
import {
  createTask,
  deleteTask,
  duplicateTask,
  onCardContentChange,
  updateTodoPosition,
} from '../redux/actions/taskAction'
import {
  createList,
  removeBoard,
  renameBoard,
} from '../redux/actions/boardAction'
import AddForm from '../components/AddForm'

const Board = (props: any) => {
  const lists = useAppSelector((state) => state.Boards.lists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBoardTask())
  }, [])
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    const sourceColIndex = lists.findIndex(
      (item) => item.id === source.droppableId
    )
    const destinationColIndex = lists.findIndex(
      (item) => item.id === destination.droppableId
    )

    const sourceCol = lists[sourceColIndex]
    const destinationCol = lists[destinationColIndex]

    const sourceSectionId = sourceCol.id
    const destinationSectionId = destinationCol.id

    const sourceTodos = [...sourceCol.cards]
    const destinationTodos = [...destinationCol.cards]

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTodos.splice(source.index, 1)
      destinationTodos.splice(destination.index, 0, removed)
    } else {
      const [removed] = destinationTodos.splice(source.index, 1)
      destinationTodos.splice(destination.index, 0, removed)
    }

    dispatch(
      updateTodoPosition({
        resourceList: sourceTodos,
        destinationList: destinationTodos,
        resourceSectionId: sourceSectionId,
        destinationSectionId: destinationSectionId,
        sourceColIndex,
        destinationColIndex,
        isSameBoard: source.droppableId === destination.droppableId,
      })
    )
  }
  return (
    <div>
      <BoardContainer countcol={lists.length + 1}>
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map((list: any, listIndex: number) => {
            let cards = lists[listIndex].cards
            return (
              <CardList
                key={list.id}
                droppableId={list.id}
                list={list}
                onChangeListName={(listName: any) =>
                  dispatch(renameBoard(list.id, listName, listIndex))
                }
                onRemoveList={() => {
                  dispatch(removeBoard(list.id, listIndex))
                }}
                onDuplicateList={() => {}}
                onChangeCardContent={(cardIndex: number, content: string) => {
                  let cardId = lists[listIndex].cards[cardIndex].id as string
                  dispatch(
                    onCardContentChange(listIndex, cardIndex, cardId, content)
                  )
                }}
                onAddCard={(cardContent: string) => {
                  dispatch(createTask(list.id, cardContent))
                }}
                onRemoveCard={(cardIndex: number) => {
                  let cardId = lists[listIndex].cards[cardIndex].id as string
                  dispatch(deleteTask(cardId, listIndex))
                }}
                onDuplicateCard={(cardIndex: number) => {
                  let id = cards[cardIndex].id as string

                  dispatch(
                    duplicateTask(id, listIndex, cardIndex, lists[listIndex].id)
                  )
                }}
                searchText={props.search}
              />
            )
          })}
        </DragDropContext>
        <AddForm
          onConfirm={(name: any) => {
            dispatch(createList({ name, position: lists.length + 1 }))
          }}
          placeholder='+ Add new list'
          focusPlaceholder='Enter list title'
          maxWidth='220px'
        />
      </BoardContainer>
    </div>
  )
}

export default Board
