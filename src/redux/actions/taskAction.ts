import { AppDispatch } from '..'
import { appApi } from '../../apis'
import {
  CardType,
  ListType,
  addCard,
  addList,
  duplicateCard,
  reOrderList,
  removeCard,
  rerrangeList,
  updateCardContent,
} from '../features/board_slice'

export interface IUpdatePostionPayload {
  isSameBoard: boolean
  sourceColIndex: number
  destinationColIndex: number
}

export interface IUpadatePositionReqType {
  resourceList: CardType[]
  destinationList: CardType[]
  resourceSectionId: string
  destinationSectionId: string
}

type IUpdatePositionReqandPay = IUpadatePositionReqType & IUpdatePostionPayload
export const updateTodoPosition = (payload: IUpdatePositionReqandPay) => {
  let {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
    sourceColIndex,
    destinationColIndex,
    isSameBoard,
  } = payload
  return async (dispatch: AppDispatch) => {
    try {
      appApi.updatePosition({
        resourceList,
        destinationList,
        resourceSectionId,
        destinationSectionId,
      })
      dispatch(
        rerrangeList({
          isSameBoard,
          sourceTodos: resourceList,
          destinationTodos: destinationList,
          sourceColIndex,
          destinationColIndex,
        })
      )
    } catch (e) {
      console.log(e, 'error')
      //snackbar's toaster's
    }
  }
}

// ==================

export const createTask = (boardId: number, content: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await appApi.createTask(boardId, content)
      res.data.id = res.data._id
      dispatch(addCard(res.data))
    } catch (e) {}
  }
}

export const deleteTask = (id: string, listIndex: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await appApi.deleteTask(id)
      dispatch(removeCard({ board: listIndex, id }))
    } catch (e) {}
  }
}

export const duplicateTask = (
  id: string,
  listIndex: number,
  cardIndex: number,
  board: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let resposne = await appApi.duplicateTask(id, board)
      dispatch(duplicateCard({ listIndex, cardIndex, id: resposne.data.newId }))
    } catch (e) {}
  }
}

export const onCardContentChange = (
  listIndex: number,
  cardIndex: number,
  cardId: string,
  content: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      let resposne = await appApi.updateContent(cardId, content)
      dispatch(updateCardContent({ listIndex, cardIndex, content }))
    } catch (e) {}
  }
}
