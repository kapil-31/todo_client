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
      <HeaderLogoContainer></HeaderLogoContainer>
    </HeaderContainer>
  )
}

export default Header
