import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from '..'
import { randomId } from '../../helpers/utils'
import mockData from '../../helpers/mockData'
import * as BoardHelper from '../../helpers/boardHelper'
import { appApi } from '../../apis'
import { error } from 'console'
import { IUpdatePostionPayload } from '../actions/taskAction'
export type CardType = {
  id?: string
  content: string
  board?: string
  position?: number | string
}
export interface ListType {
  id: string
  name: string
  cards: CardType[]
}
interface TodoSliceType {
  lists: ListType[] | []
  offset: number
  loading: boolean
  error: any
}

const initialState: TodoSliceType = {
  lists: [],
  loading: false,
  offset: 0,
  error: null,
}

export const fetchBoardTask = createAsyncThunk(
  'boards/fetchBoards',
  async () => {
    let res = await appApi.fetchList()
    return res.data
  }
)

export const BoardSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<any>) => {
      state.lists = [...state.lists, action.payload]
    },
    removeList: (state, action: PayloadAction<any>) => {
      state.lists = state.lists.filter((item) => item.id === action.payload)
    },
    rerrangeList: (state, action: PayloadAction<any>) => {
      let {
        sourceTodos,
        destinationTodos,
        sourceColIndex,
        destinationColIndex,
        isSameBoard,
      } = action.payload
      let list = state.lists
      if (!isSameBoard) {
        list[sourceColIndex].cards = sourceTodos
        list[destinationColIndex].cards = destinationTodos
      } else {
        list[destinationColIndex].cards = destinationTodos
      }
    },
    addCard: (state, action: PayloadAction<CardType>) => {
      let boardId = action.payload.board
      console.log(action.payload)
      let newList = state.lists.map((item) => {
        if (item.id === boardId) {
          item.cards = [...item.cards, action.payload]
        }
        return item
      })
      state.lists = newList
    },
    removeCard: (
      state,
      action: PayloadAction<{ board: number; id: string }>
    ) => {
      let obj = state.lists[action.payload.board]
      let cards = obj.cards
      let cardIndex = obj.cards.findIndex(
        (item) => item.id === action.payload.id
      )
      cards.splice(cardIndex, 1)
    },
    renameBoarTitle: (
      state,
      action: PayloadAction<{ name: string; listIndex: number }>
    ) => {
      let obj = state.lists[action.payload.listIndex]
      if (!!obj) {
        obj.name = action.payload.name
      }
    },

    duplicateCard: (
      state,
      action: PayloadAction<{
        listIndex: number
        cardIndex: number

        id: string
      }>
    ) => {
      let cards = state.lists[action.payload.listIndex].cards

      let { content, position, board } = cards[action.payload.cardIndex]
      let cpdoc = {
        content,
        position,
        id: action.payload.id,
        board,
      }
      //@ts-ignore
      cards.splice(action.payload.cardIndex, 0, cpdoc)
    },
    reOrderList: (state, action: PayloadAction<ListType[]>) => {
      return {
        ...state,
        lists: action.payload,
      }
    },
    moveCardToList: (state, action: PayloadAction<any>) => {
      let newState
      const sourceListIndex = state.lists.findIndex(
        (cardList) => cardList.id === action.payload.sourceListId
      )
      const sourceList = state.lists[sourceListIndex]
      const destinationListIndex = state.lists.findIndex(
        (cardList) => cardList.id === action.payload.destinationListId
      )
      const destinationList = state.lists[destinationListIndex]
      const cardSourceIndex = sourceList.cards.findIndex(
        (item) => item.id === action.payload.cardId
      )
      const { newSourceList, newDestinationList }: any =
        BoardHelper.moveCardToList(
          sourceList.cards,
          destinationList.cards,
          cardSourceIndex,
          action.payload.cardDestinationIndex
        )

      newState = [...state.lists]
      newState[sourceListIndex] = {
        ...newState[sourceListIndex],
        cards: newSourceList,
      }
      newState[destinationListIndex] = {
        ...newState[destinationListIndex],
        cards: newDestinationList,
      }
      return {
        ...state,
        lists: newState,
      }
    },
    updateCardContent: (
      state,
      action: PayloadAction<{
        listIndex: number
        cardIndex: number
        content: string
      }>
    ) => {
      let { content, cardIndex, listIndex } = action.payload
      let cards = state.lists[listIndex].cards
      cards[cardIndex] = {
        ...cards[cardIndex],
        content,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardTask.pending, (state, action: PayloadAction<any>) => {
        state.loading = true
      })
      .addCase(
        fetchBoardTask.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('fullFilled', action.payload)
          state.loading = false
          state.lists = [...state.lists, ...action.payload]
        }
      )
      .addCase(fetchBoardTask.rejected, (state, action: PayloadAction<any>) => {
        console.log(action as any)
        state.loading = true
        state.error = action
      })
  },
})
export const {
  addCard,
  moveCardToList,
  addList,
  removeCard,
  duplicateCard,
  reOrderList,
  rerrangeList,
  updateCardContent,
  renameBoarTitle,
} = BoardSlice.actions

export const selectAllBoards = (state: RootState) => state.Boards.lists

export default BoardSlice.reducer
