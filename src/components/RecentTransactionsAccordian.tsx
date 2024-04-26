import React, { useEffect } from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import recentTransactionsSvg from "../images/recent-transactions.svg";
import downArrowSvg from "../images/down-arrow.svg";

import fileStorageSvg from "../images/file-storage.svg";
import flightsSvg from "../images/flights.svg";
import megaPhoneSvg from "../images/megaphone.svg";
import transactionCardSvg from "../images/business-and-finance.svg";
import { useSavedCardsContext } from '../context/SavedCardsContext';
import useIsMobile from '../hooks/useIsMobile';

interface TransactionDetail {
    badgeColor: string;
    icon: any;
    name: string,
    dateStr: string,
    amount: number,
    action: string,
    currency: string,
    overrideCss?: string
    id: string
}

const TRANSACTIONS_MOCK = [
    {
        badgeColor: '#009DFF1A',
        icon: fileStorageSvg,
        name: 'Hamleys',
        dateStr: '20 May 2020',
        amount: 150,
        action: 'CREDIT',
        currency: 'S$',
        id: '1'
    },
    {
        badgeColor: '#00D6B51A',
        icon: flightsSvg,
        name: 'Hamleys',
        dateStr: '20 May 2020',
        amount: 150,
        action: 'DEBIT',
        currency: 'S$',
        overrideCss: 'mt-4',
        id: '2'
    },
    {
        badgeColor: '#F251951A',
        icon: megaPhoneSvg,
        name: 'Hamleys',
        dateStr: '20 May 2020',
        amount: 150,
        action: 'DEBIT',
        currency: 'S$',
        overrideCss: 'mt-4',
        id: '3'
    }
]

const TransactionCard = ({transactionDetail}: {transactionDetail: TransactionDetail}) => {
    const isMobile = useIsMobile()
    return(
        <div className={`transaction-card justify-between flex ${transactionDetail.overrideCss || ''}`}>
            <div className='transaction-badge-and-name-container grow flex'>
                <div className='transaction-badge' style={{ background: transactionDetail.badgeColor }}>
                    <img className='transaction-badge-icon' src={transactionDetail.icon}></img>
                </div>
                <div className={`${isMobile ? 'mobile-transaction-name-column' : 'transaction-name-column'} flex-col`}>
                    <div className='transaction-name'>{transactionDetail.name}</div>
                    <div className='transaction-date'>{transactionDetail.dateStr}</div>
                    <div className='credit-debit-info-row flex'>
                        <div className='credit-debit-icon-container flex justify-center items-center mr-2'>
                            <img className='credit-debit-icon' src={transactionCardSvg}></img>
                        </div>
                        <div className='credit-debit-label-row'>{transactionDetail.action === 'CREDIT' ? 'Refund on debit card' : 'Charged to debit card'}</div>
                    </div>
                </div>
            </div>
            <div className={`transaction-amount-container flex ${transactionDetail.action === 'CREDIT' ? 'transaction-amount-green' : ''}`}>
                <div>{transactionDetail.action === 'CREDIT' ? '+' : '-'}</div>
                <div className='mr-1'>{transactionDetail.currency}</div>
                <div>{transactionDetail.amount}</div>
            </div>
        </div>
    )
}

const RecentTransactionsList = () => {
    return (
        <div className='transactions-list'>
            <div className='transactions-list-inner-container'>
                {
                        TRANSACTIONS_MOCK.map((transactionDetail: TransactionDetail) => (
                            <div key={transactionDetail.id} className='transaction-card-container'>
                                <TransactionCard transactionDetail={transactionDetail} />
                            </div>
                        ))
                }
            </div>
            <div className='view-all-transactions'>View all card transactions</div>
        </div>
    )
}

export const RecentTransactionsAccordian = () => {
    const { savedCardsLoading, savedCards } = useSavedCardsContext()
    const [expanded, setExpanded] = React.useState(false)

    useEffect(() => {
        if(!savedCardsLoading && savedCards.length > 0){
            setExpanded(true)
        }

    }, [savedCardsLoading, savedCards])

    return (
        <div className='recent-transactions-accordian'>
            <Accordion expanded={expanded} className='recent-transactions-accordian-main'>
                <AccordionSummary
                expandIcon={<img src={downArrowSvg} />}
                onClick={() => setExpanded(!expanded)}
                className='recent-transactions-accordian-summary'
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <img className='mr-3' src={recentTransactionsSvg}></img>  Recent transactions
                </AccordionSummary>
                <AccordionDetails className='recent-transactions-accordian-details'>
                    <RecentTransactionsList />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}