//@ts-nocheck

import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import mockData from '../helpers/mockData'
import { BoardContainer } from '../styles/Board.styles'
import CardList from '../components/CardList'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import {
  addCard,
  duplicateCard,
  reOrderList,
  removeCard,
} from '../redux/features/todoSlice'

const Board = (props: any) => {
  const list = useAppSelector((state) => state.todos.lists)
  const dispatch = useAppDispatch()
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      dispatch(
        reOrderList({
          listId: source.droppableId,
          cardSourceIndex: source.index,
          cardDestinationIndex: destination.index,
        })
      )
    } else {
      props.moveCardToList(
        source.droppableId,
        draggableId,
        destination.droppableId,
        destination.index
      )
    }
  }

  return (
    <div>
      <BoardContainer countColumns={mockData.length + 1}>
        <DragDropContext onDragEnd={onDragEnd}>
          {list.map((list: any, listIndex: number) => {
            return (
              <CardList
                key={list.id}
                droppableId={list.id}
                list={list}
                onChangeListName={(listName) =>
                  props.onChangeListName(listIndex, listName)
                }
                onRemoveList={() => props.onRemoveList(listIndex)}
                onDuplicateList={() => props.onDuplicateList(listIndex)}
                onChangeCardContent={(cardIndex, content) =>
                  props.onChangeCardContent(listIndex, cardIndex, content)
                }
                onAddCard={(cardContent) =>
                  dispatch(addCard({ listIndex, cardContent }))
                }
                onRemoveCard={(cardIndex) =>
                  dispatch(removeCard({ listIndex, cardIndex }))
                }
                onDuplicateCard={(cardIndex) =>
                  dispatch(duplicateCard({ listIndex, cardIndex }))
                }
                searchText={props.search}
              />
            )
          })}
        </DragDropContext>
      </BoardContainer>
    </div>
  )
}

export default Board
