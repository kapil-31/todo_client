import {
  HeaderContainer,
  HeaderInputWrapper,
  HeaderLogoContainer,
} from '../styles/Header.styles'
import SearchInput from './HeaderStartButton'

const Header = (props: any) => {
  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <HeaderInputWrapper>
          <SearchInput
            placeholder='Search cards...'
            value={props.search}
            onChange={(e: any) => props.setSearch(e.target.value)}
          />
        </HeaderInputWrapper>
      </HeaderLogoContainer>
    </HeaderContainer>
  )
}

export default Header
