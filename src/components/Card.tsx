import { useState, useEffect, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import OutsideClickHandler from './OutsideClickHandler'
import { CardContainer } from '../styles/Card.styles'
import * as UtilsHelper from '../helpers/utils'
import ContentEditable from './ContentEditable'

import IconButton from './IconButton'
import moment from 'moment'

const Card = ({
  card,
  index,
  onChangeCardContent,
  onRemoveCard,
  onDuplicateCard,
}: any) => {
  const [editMode, setEditMode] = useState(false)
  const [onHover, setOnHover] = useState(false)
  const ref = useRef(null) as any

  useEffect(() => {
    if (editMode) {
      UtilsHelper.focusCursorToEnd(ref)
    }
  }, [editMode])

  const [cardContent, setCardContent] = useState(card.content)

  useEffect(() => {
    setCardContent(card.content)
  }, [card.content])

  const onClickOutside = () => {
    setEditMode(false)
    onChangeCardContent(cardContent)
  }

  const onClickSaveEdit = () => {
    if (editMode) {
      onChangeCardContent(cardContent)
    }
    setEditMode((iseditMode) => !iseditMode)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Tab') {
      e.stopPropagation()
      e.preventDefault()
      setEditMode(false)
      ref.current.blur()
      const name = ref.current.innerText
      onChangeCardContent(name)
    }
  }
  return (
    <OutsideClickHandler
      shouldListenClick={editMode}
      onClickOutside={onClickOutside}
    >
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(provided) => (
          <CardContainer
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
          >
            {(onHover || editMode) && (
              <IconButton.ButtonContainer
                right={!editMode ? '42px' : undefined}
              >
                <IconButton
                  onClick={onClickSaveEdit}
                  icontype={editMode ? 'confirm' : 'edit'}
                />
              </IconButton.ButtonContainer>
            )}
            {onHover && !editMode && (
              <>
                <IconButton.ButtonContainer right='22px'>
                  <IconButton onClick={onDuplicateCard} icontype='copy' />
                </IconButton.ButtonContainer>
                <IconButton.ButtonContainer>
                  <IconButton onClick={onRemoveCard} icontype='delete' />
                </IconButton.ButtonContainer>
              </>
            )}
            <ContentEditable
              innerRef={ref}
              disabled={!editMode}
              html={cardContent}
              onChange={(e) => setCardContent(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <span
              style={{
                fontSize: '9px',
                display: 'relative',
                top: 20,
              }}
            >
              {moment(
                moment(card.createdAt).format('YYYY-MM-DD HH:mm:ss')
              ).fromNow()}
            </span>
          </CardContainer>
        )}
      </Draggable>
    </OutsideClickHandler>
  )
}

export default Card
