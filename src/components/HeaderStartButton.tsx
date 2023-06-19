import { PropsWithChildren, useEffect, useRef } from 'react'

import {
  Input,
  InputContainer,
  IconWrapper,
  Button,
} from '../styles/Input.styles'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { appApi } from '../apis'
import { fetchBoardTask } from '../redux/features/board_slice'
type SearchInputType = {
  placeholder: string
  value: string
  onChange: (e: HTMLElementEventMap) => void
  [x: string]: any
}
const StartButton = (props: PropsWithChildren<SearchInputType>) => {
  const { lists, loading } = useAppSelector((state) => state.Boards)
  const dispatch = useAppDispatch()
  async function createBoards() {
    await appApi.createList()
    dispatch(fetchBoardTask())
  }
  const firestender = useRef(true)
  useEffect(() => {
    if (firestender.current) {
    } else {
      firestender.current = false
    }
  }, [])

  if (loading) return null
  return (
    <InputContainer>
      {firestender && !lists.length ? (
        <Button onClick={createBoards} {...(props as any)}>
          Please Click Here To Start
        </Button>
      ) : null}
    </InputContainer>
  )
}
export default StartButton
