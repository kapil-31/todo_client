import {
  IUpadatePositionReqType,
  IUpdatePostionPayload,
} from '../redux/actions/taskAction'
import { CardType } from '../redux/features/board_slice'
import { request } from './config'
export interface IBoardCreatePayload {
  name: string
  status: string
}
export interface ITaskCreateTaskPayload {
  content: string
  position: number
  board: string
}

const board = {
  fetchList: async (query?: any) => await request.get('/board/all'),
  createList: async (data?: IBoardCreatePayload) =>
    await request.post('/board/', data),
  deleteList: async (id: string) => await request.delete('/board/' + id),
  renametitle: async (id: string, name: string) =>
    await request.put('/board/' + id, {
      name,
    }),
}
const todos = {
  updatePosition: async (payload: IUpadatePositionReqType) =>
    await request.put(`/task/update-position`, payload),
  createTask: async (boardId: number, content: string) =>
    await request.post(`/task/${boardId}/create`, { content }),
  deleteTask: async (id: string) => await request.delete('/task/' + id),
  duplicateTask: async (id: string, board: string) =>
    await request.put('/task/duplicate/' + board + '/' + id),

  updateContent: async (cardId: string, content: string) =>
    await request.put(`/task/${cardId}`, { content }),
}

export const appApi = {
  ...board,
  ...todos,
}
