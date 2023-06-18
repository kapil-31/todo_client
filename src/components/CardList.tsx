import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'
import { CardListContainer, CardListWrapper } from '../styles/CardList.styles'
import CardListHeader from './CardListHeader'
import AddForm from './AddForm'
import { ListType } from '../redux/features/board_slice'

const getFilteredCards = (cards: any, searchText: any) => {
  if (searchText) {
    return cards.filter((card: any) =>
      card.content.toLowerCase().includes(searchText.toLowerCase())
    )
  }
  return cards
}
interface ICardListType {
  list: ListType
  onChangeListName: any
  onRemoveList: any
  onDuplicateList: () => any
  droppableId: string
  searchText: any
  onChangeCardContent: (index: number, content: string) => any
  onRemoveCard: (index: number) => void
  onDuplicateCard: (index: number) => void
  onAddCard: (content: string) => void
}
const CardList = (props: ICardListType) => {
  console.log({ d: props.droppableId })
  return (
    <CardListWrapper>
      <CardListHeader
        listName={props.list.name}
        onChangeListName={props.onChangeListName}
        onRemoveList={props.onRemoveList}
        onDuplicateList={props.onDuplicateList}
      />
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <CardListContainer
            ref={provided.innerRef}
            isdraggeover={snapshot.isDraggingOver ? 'true' : 'false'}
          >
            {getFilteredCards(props.list.cards, props.searchText).map(
              (card: any, index: any) => (
                <Card
                  key={card._id}
                  card={card}
                  index={index}
                  onChangeCardContent={(content) =>
                    props.onChangeCardContent(index, content)
                  }
                  onRemoveCard={() => props.onRemoveCard(index)}
                  onDuplicateCard={() => props.onDuplicateCard(index)}
                />
              )
            )}
            {provided.placeholder}
            <AddForm
              onConfirm={props.onAddCard}
              placeholder='+ Add new card'
              focusPlaceholder='Enter card content'
              darkfont
              width='auto'
              gray
            />
          </CardListContainer>
        )}
      </Droppable>
    </CardListWrapper>
  )
}

export default CardList
