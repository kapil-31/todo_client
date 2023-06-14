import React, { PropsWithChildren } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { Input, InputContainer, IconWrapper } from '../styles/Input.styles'
type SearchInputType = {
  placeholder: string
  value: string
  onChange: (e: HTMLElementEventMap) => void
  [x: string]: any
}
const SearchInput = (props: PropsWithChildren<SearchInputType>) => {
  return (
    <InputContainer>
      <Input {...(props as any)} />
      <IconWrapper>
        <FontAwesomeIcon icon={faSearch} />
      </IconWrapper>
    </InputContainer>
  )
}
export default SearchInput
