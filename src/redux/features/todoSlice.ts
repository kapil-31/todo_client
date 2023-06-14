import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { randomId } from '../../helpers/utils'
import mockData from '../../helpers/mockData'
import * as BoardHelper from '../../helpers/boardHelper'
type cardType = { id: string; content: string }
type todoType = {
  id: string
  name: string
  cards: cardType[]
}
interface TodoSliceType {
  lists: todoType[] | []
  offset: number
}

const initialState: TodoSliceType = {
  lists: mockData,
  offset: 0,
}

export const TodoSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<any>) => {
      state.lists = [
        ...state.lists,
        {
          id: randomId(),
          name: action.payload,
          cards: [],
        },
      ]
      state.offset += 1
    },
    removeList: (state, action: PayloadAction<any>) => {
      state.lists = state.lists.splice(action.payload, 1)
    },
    duplicateList: (state, action: PayloadAction<any>) => {
      const listTopDuplicate = state.lists[action.payload]

      return {
        ...state,
        lists: [
          ...state.lists.slice(0, action.payload),
          {
            ...listTopDuplicate,
            id: randomId(),
            cards: listTopDuplicate.cards.map((card) => ({
              ...card,
              id: randomId(),
            })),
          },
          ...state.lists.slice(action.payload),
        ],
      }
    },
    addCard: (state, action: PayloadAction<any>) => {
      console.log({ action })
      return {
        ...state,
        lists: state.lists.map((list, index) => {
          if (index !== action.payload.listIndex) {
            return list
          }
          return {
            ...list,
            cards: [
              ...list.cards,
              { id: randomId(), content: action.payload.cardContent },
            ],
          }
        }),
      }
    },
    removeCard: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        lists: state.lists.map((list, index) => {
          if (index !== action.payload.listIndex) {
            return list
          }
          const newCards = [...list.cards]
          newCards.splice(action.payload.cardIndex, 1)
          return {
            ...list,
            cards: newCards,
          }
        }),
      }
    },
    duplicateCard: (state, action: PayloadAction<any>) => {
      console.log({ action })
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (listIndex !== action.payload.listIndex) {
            return list
          }
          const cardToDuplicate = list.cards[action.payload.cardIndex]
          return {
            ...list,
            cards: [
              ...list.cards.slice(0, action.payload.cardIndex),
              {
                ...cardToDuplicate,
                id: randomId(),
              },
              ...list.cards.slice(action.payload.cardIndex),
            ],
          }
        }),
      }
    },
    reOrderList: (state, action: PayloadAction<any>) => {
      const listIndex = state.lists.findIndex(
        (list) => list.id === action.payload.listId
      )
      const list = state.lists[listIndex]
      const orderedListCards = BoardHelper.reOrderList(
        list.cards,
        action.payload.cardSourceIndex,
        action.payload.cardDestinationIndex
      )
      let newState = [...state.lists]
      newState[listIndex] = {
        ...newState[listIndex],
        cards: orderedListCards as cardType[],
      }

      return {
        ...state,
        lists: newState,
      }
    },
  },
})
export const { addCard, addList, removeCard, duplicateCard, reOrderList } =
  TodoSlice.actions

export const selectCount = (state: RootState) => state.todos.lists
export default TodoSlice.reducer
