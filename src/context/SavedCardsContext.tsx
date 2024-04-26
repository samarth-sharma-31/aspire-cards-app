import React, { useEffect } from 'react'
import { AvailableBalanceData, CardDetails, MOCK_CARD_DETAILS_LIST, useGetAvailableBalance, useGetSavedCards } from '../services/cards'


export interface SavedCardsContextInterface {
  savedCards: CardDetails[];
  freezeCard: (cardIndex: number) => void;
  unFreezeCard: (cardIndex: number) => void;
  saveCard: (cardDetails: CardDetails) => void;
  availableBalanceData?: AvailableBalanceData;
  availableBalanceLoading: boolean;
  savedCardsLoading: boolean;
}

export const SavedCardsContext = React.createContext<SavedCardsContextInterface>({
    savedCards: MOCK_CARD_DETAILS_LIST,
    freezeCard: () => void 0,
    unFreezeCard: () => void 0,
    saveCard: () => void 0,
    availableBalanceData: undefined,
    availableBalanceLoading: false,
    savedCardsLoading: false,
})

export function SavedCardsContextProvider(props: React.PropsWithChildren<unknown>): React.ReactElement {
  const [savedCards, setSavedCards] = React.useState<CardDetails[]>([])

  // TODO: Implement api call to fetch saved cards from BE and set it in state.

  const { data: savedCardsResponse, loading: savedCardsLoading } = useGetSavedCards({
    lazy: false
  })

  const { data: availableBalanceData, loading: availableBalanceLoading } = useGetAvailableBalance({
    lazy: false
  })

  useEffect(() => {
      if(savedCardsResponse){
        setSavedCards(savedCardsResponse)
      }

  }, [savedCardsResponse])

  // To be moved to BE api
  const freezeCard = React.useCallback((cardIndex: number) => {
    setSavedCards(prevCards => {
        const updatedCards = [...prevCards];
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            isFrozen: true
        }

        return updatedCards
    })
  }, [])

  // To be moved to BE api
  const unFreezeCard = React.useCallback((cardIndex: number) => {
    setSavedCards(prevCards => {
        const updatedCards = [...prevCards];
        updatedCards[cardIndex] = {
            ...updatedCards[cardIndex],
            isFrozen: false
        }

        return updatedCards
    })
  }, [])

  // To be moved to BE api
  const saveCard = React.useCallback((cardDetails: CardDetails) => {
    setSavedCards(prevCards => {
        return [cardDetails, ...prevCards]
    })
  }, [])

  return (
    <SavedCardsContext.Provider value={{ savedCards, freezeCard, unFreezeCard, saveCard, availableBalanceData, availableBalanceLoading, savedCardsLoading }}>
      {props.children}
    </SavedCardsContext.Provider>
  )
}

export function useSavedCardsContext(): SavedCardsContextInterface {
  return React.useContext(SavedCardsContext)
}
