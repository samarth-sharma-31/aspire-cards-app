import React from 'react';
import { SavedCardsContextProvider } from '../../context/SavedCardsContext';
import useIsMobile from '../../hooks/useIsMobile';
import { AvailableBalanceWidget } from '../AvailableBalanceWidget';
import CardsTabs from '../CardsTabs';
import { NewCardButton } from '../NewCardButton';

function CardsPageHeader(){
    return (
        <div className='cards-page-header'>
            <AvailableBalanceWidget />
            <NewCardButton />
        </div>
    )
}

function CardsPageBody(){
    return (
        <div className='cards-page-body'>
            <CardsTabs />
        </div>
    )
}

export default function Cards (){

    return (
        <div className={`cards-page-container`}>
            <SavedCardsContextProvider>
                <CardsPageHeader />
                <CardsPageBody />
            </SavedCardsContextProvider>
        </div>
    )
}