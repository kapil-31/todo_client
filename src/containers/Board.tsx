//@ts-nocheck

import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import mockData from '../helpers/mockData'
import { BoardContainer } from '../styles/Board.styles'
import CardList from '../components/CardList'

const Board = (props: any) => {
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    if (source.droppableId === destination.droppableId) {
      props.reOrderList(source.droppableId, source.index, destination.index)
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
          {mockData.map((list: any, listIndex: number) => {
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
                  props.onAddCard(listIndex, cardContent)
                }
                onRemoveCard={(cardIndex) =>
                  props.onRemoveCard(listIndex, cardIndex)
                }
                onDuplicateCard={(cardIndex) =>
                  props.onDuplicateCard(listIndex, cardIndex)
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
