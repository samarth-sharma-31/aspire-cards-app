import React from 'react'
import { useSavedCardsContext } from '../context/SavedCardsContext'
import Skeleton from '@mui/material/Skeleton';

// Value can be fetched via and api and loaded

const CurrencyBadge = ({ currency }: { currency?: string }) => {
    return currency ? (
        <div className='currency-badge mr-4'><b>{currency}</b></div>
    ) : null
}

const BalanceAmount = ({ amount }: { amount?: number }) => {
    return amount ? (
        <div className='available-amount'><b>{amount}</b></div>
    ) : null
}

export const AvailableBalanceWidget = () => {
    const {availableBalanceLoading, availableBalanceData } = useSavedCardsContext()
    
    return (
        <div className='available-balance-container'>
            <div className='available-balance-label mb-1'>Available balance</div>
            <div className='available-balance-details flex items-center'>
                        {
                            availableBalanceLoading ? (
                                <>
                                    <Skeleton animation="wave" className='mr-1' variant="rectangular" width={40} height={42} />
                                    <Skeleton animation="wave" variant="rectangular" width={80} height={42} />
                                </>
                            ) : (
                                <>
                                    <CurrencyBadge currency={availableBalanceData?.currency} />
                                    <BalanceAmount amount={availableBalanceData?.amount} />
                                </>
                            )
                        }
                    </div>
        </div>
    )
}