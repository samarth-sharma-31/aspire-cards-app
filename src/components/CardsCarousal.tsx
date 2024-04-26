import React from 'react'
import { useSavedCardsContext } from '../context/SavedCardsContext'
import { CardDetails } from '../services/cards'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import companyLogoWhite from '../images/company-logo-white.svg'
import visaLogo from '../images/visa-logo.svg'
import LockIcon from '@mui/icons-material/Lock';

interface CreditCardProps {
    cardDetail: CardDetails; 
    isCardNumberCompletelyHidden?: boolean, 
    shouldShowCardNumber?: boolean
}

interface CreditCardNumberRowProps {
    shouldShowCardNumber?: boolean;
    cardNumber: string
}

const getChunkedArr = (inputStr: string, size: number) => {
    const strArrToProcess = inputStr.split('');
    const strChunkArr = []

    while(strArrToProcess.length){
        let singleChunk = strArrToProcess.splice(0,size);
        strChunkArr.push(singleChunk.join(''));
    }

    return strChunkArr;

}

const CreditCardNumberRow = (props: CreditCardNumberRowProps) => {
    const { shouldShowCardNumber, cardNumber } = props

    const isCardNumberCompletelyHidden = cardNumber.length < 1;
    const renderArr = isCardNumberCompletelyHidden ? Array(4).fill('dummy') : Array(3).fill('dummy');

    const lastFourDigits = cardNumber.slice(-4);

    const getHiddenCardNumberSection = (index: number) => (
        <div key={index} className='credit-card-number-hidden flex items-center mr-5'>
            <div className='credit-card-number-dot mr-1'></div>
            <div className='credit-card-number-dot mr-1'></div>
            <div className='credit-card-number-dot mr-1'></div>
            <div className='credit-card-number-dot'></div>
        </div>
    )

    const getVisibleCardNumberSection = () => {
        const chunksArr = getChunkedArr(cardNumber, 4);
        return chunksArr.map((singleChunk, index) => (
            <div key={index} className='credit-card-number-visible flex items-center mr-5'>
                {singleChunk}
            </div>
        ))
    }

    return (
        <div className='credit-card-number-container flex mb-3'>
            {
                isCardNumberCompletelyHidden ? (
                    <div className='credit-card-number-row flex'>{renderArr.map((_item, index) => getHiddenCardNumberSection(index))}</div>
                ) : shouldShowCardNumber ? (
                    <div className='credit-card-number-row flex'>
                        {getVisibleCardNumberSection()}
                        {/* <div>{hiddenDigits}</div>
                        <div className='credit-card-number-info'>{lastFourDigits}</div> */}
                    </div>
                ) : (
                    <div className='credit-card-number-row flex'>
                        {renderArr.map((_item, index) => getHiddenCardNumberSection(index))}
                        <div className='credit-card-number-visible'>{lastFourDigits}</div>
                    </div>
                )
            }
        </div>
    )
}

export function CreditCard({cardDetail, isCardNumberCompletelyHidden, shouldShowCardNumber}: CreditCardProps){

    const renderArr = isCardNumberCompletelyHidden ? Array(4).fill('dummy') : Array(3).fill('dummy');
    const hiddenDigits = cardDetail.cardNumber.split('').slice(0, 12).join('')
    const lastFourDigits = cardDetail.cardNumber.split('').slice(-4).join('')
    return (
        <Paper elevation={3} className={`${cardDetail.isFrozen ? 'credit-card-inactive' : 'credit-card-active'} credit-card p-8`}>
            <div className='flex-col'>
                <div className={`card-company-logo flex ${cardDetail.isFrozen ? 'justify-between' : 'justify-end'} mb-6`}>
                    {
                        cardDetail.isFrozen && (
                            <LockIcon className='lock-icon' />
                        )
                    }
                    <img className='company-logo-credit-card-white' src={companyLogoWhite}></img>
                </div>
                <div className={`card-holder-name mb-4 ${!cardDetail.name ? 'card-holder-name-empty' : ''}`}>{cardDetail.name}</div>
                <CreditCardNumberRow cardNumber={cardDetail.cardNumber} shouldShowCardNumber={shouldShowCardNumber}  />
                <div className='credit-card-validity-and-cvv flex mb-1'>
                    <div className='credit-card-validity mr-9'>Thru: {cardDetail.validity}</div>
                    <div className='credit-card-cvv flex'>
                        <div className='credit-card-cvv-label mr-2'>CVV:</div>
                        <div className='credit-card-cvv-hidden'>***</div>
                    </div>
                </div>
                <div className='credit-card-type-logo flex justify-end'>
                <img className='visa-logo' src={visaLogo}></img>
                </div>
            </div>
        </Paper>
    )
}

interface CardsCarousalProps {
    shouldShowCardNumber: boolean; 
    cards: CardDetails[]; 
    handleCardIndexUpdate: (index: number) => void
}

export const CardsCarousal = ({cards, handleCardIndexUpdate, shouldShowCardNumber}: CardsCarousalProps) => {
    
    return (
        <div className='cards-carousal-container'>
            <Carousel indicatorIconButtonProps={{
                style: {
                    color: '#01D167',
                    opacity: '30%',
                    height: '10px',
                    width: '10px',
                    marginRight: '4px'
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: '#01D167',
                    opacity: '100%',
                    width: '16px',
                    height: '12px',
                }
            }} 
            onChange={(now, previous) => {
                handleCardIndexUpdate(now as number)
            }}
    navButtonsAlwaysInvisible={true} autoPlay={false} animation='slide' swipe={true}>
            {
                cards.map( (cardDetail) => <CreditCard key={cardDetail.id} shouldShowCardNumber={shouldShowCardNumber} cardDetail={cardDetail} /> )
            }
            </Carousel>
        </div>
    )
}