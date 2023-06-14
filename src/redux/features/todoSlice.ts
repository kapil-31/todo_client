import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app'
import { randomId } from '../../helpers/utils'
type cardType = { id: string; content: string }
type todoType = {
  id: string
  name: string
  cards: cardType[]
}
interface TodoSlice {
  todos: todoType[] | []
  offset: number
}

const initialState: TodoSlice = {
  todos: [],
  offset: 0,
}

export const counterSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<any>) => {
      state.todos = [
        ...state.todos,
        {
          id: randomId(),
          name: action.payload,
          cards: [],
        },
      ]
      state.offset += 1
    },
    removeList: (state, action: PayloadAction<any>) => {
      state.todos = state.todos.splice(action.payload, 1)
    },
    duplicateList: (state, action: PayloadAction<any>) => {
      const listTopDuplicate = state.todos[action.payload]

      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.payload),
          {
            ...listTopDuplicate,
            id: randomId(),
            cards: listTopDuplicate.cards.map((card) => ({
              ...card,
              id: randomId(),
            })),
          },
          ...state.todos.slice(action.payload),
        ],
      }
    },
    addCard: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        todos: state.todos.map((list, index) => {
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
        todos: state.todos.map((list, index) => {
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
      return {
        ...state,
        todos: state.todos.map((list, listIndex) => {
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
  },
})
