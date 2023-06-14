import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faCheck,
  faTrashAlt,
  faUndo,
  faRedo,
  faCopy,
} from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
  border: none;
  background: none;
  outline: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 3px;
  color: ${(props: any) =>
    props.icontype === 'undo' || props.icontype === 'redo'
      ? props.theme.whiteIcon
      : props.theme.grayIcon};
  font-size: ${(props: any) => props.fontSize || ''};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  &:hover {
    ${(props: any) =>
      !props.disabled &&
      css`
        background-color: ${props.icontype === 'undo' ||
        props.icontype === 'redo'
          ? props.theme.blueHover
          : props.theme.grayHover};
      `};
  }
`

export const ButtonContainer = styled.div`
  position: absolute;
  top: ${(props: any) => props.top || '2px'};
  right: ${(props: any) => props.right || '3px'};
`

const getIconForType = (type: IconForType) => {
  switch (type) {
    case 'edit':
      return faPen
    case 'confirm':
      return faCheck
    case 'delete':
      return faTrashAlt
    case 'undo':
      return faUndo
    case 'redo':
      return faRedo
    case 'copy':
      return faCopy
    default:
      return null
  }
}

type IconForType = 'edit' | 'confirm' | 'delete' | 'undo' | 'redo' | 'copy'

type IconButtonProps = {
  icontype: IconForType
  [x: string]: any
}
const IconButton = (props: IconButtonProps) => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={getIconForType(props.icontype) as any} />
    </Button>
  )
}
IconButton.propTypes = {
  icontype: PropTypes.oneOf([
    'edit',
    'confirm',
    'delete',
    'undo',
    'redo',
    'copy',
  ]),
}
IconButton.ButtonContainer = ButtonContainer

export default IconButton