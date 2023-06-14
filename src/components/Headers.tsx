import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import {
  HeaderContainer,
  HeaderLogo,
  HeaderLogoContainer,
  HeaderInputWrapper,
  HeaderIconsContainer,
} from '../styles/Header.styles'

import logo from '../assets/trello-logo.png'
import SearchInput from './SearchInput'

import IconButton from './IconButton'

const Header = (props: any) => {
  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <HeaderInputWrapper>
          <SearchInput
            placeholder='Search....'
            value={props.search}
            onChange={(e) => {
              console.log({ e })
            }}
          />
        </HeaderInputWrapper>
        <Link to='/board'>
          <HeaderLogo src={logo}></HeaderLogo>
        </Link>
        <HeaderIconsContainer>
          <IconButton
            icontype='undo'
            fontSize='15px'
            disabled={!props.hasPreviousStates}
            onClick={() => {
              console.log('button')
            }}
          />
          <IconButton
            icontype='redo'
            fontSize='15px'
            onClick={() => {
              console.log('redo')
            }}
            disabled={!props.hasNextStates}
          />
        </HeaderIconsContainer>
      </HeaderLogoContainer>
    </HeaderContainer>
  )
}

export default Header
