import { AppDispatch } from '..'
import { IBoardCreatePayload, appApi } from '../../apis'
import { addList, renameBoarTitle } from '../features/board_slice'

export const createList = (data?: IBoardCreatePayload) => {
  return async (dispatch: AppDispatch) => {
    try {
      const newList = await appApi.createList(data)
      dispatch(addList(newList))
    } catch (e) {}
  }
}

export const deleteList = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await appApi.deleteList(id)
      dispatch(addList(id))
    } catch (e) {}
  }
}

export const renameBoard = (id: string, name: string, listIndex: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      let resposne = await appApi.renametitle(id, name)
      dispatch(renameBoarTitle({ name, listIndex }))
    } catch (e) {}
  }
}
