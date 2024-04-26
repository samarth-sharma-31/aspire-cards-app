import React, { useEffect } from "react"

export interface AvailableBalanceData {
    amount: number,
    currency: string
}

function fetchAvailableBalance(): Promise<AvailableBalanceData>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ amount: 3000, currency: 'S$' })
        }, 3000)
    })
}

function fetchSavedCards(): Promise<CardDetails[]>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(MOCK_CARD_DETAILS_LIST)
        }, 3000)
    })
}


interface CommonQueryParams {
    lazy?: boolean
}

interface AvailableBalanceFetchDetails {
    data?: AvailableBalanceData;
    error?: string;
    loading: boolean;
    refetch: () => void;
}

interface SavedCardsFetchDetails {
    data?: CardDetails[];
    error?: string;
    loading: boolean;
    refetch: () => void;
}

export function useGetAvailableBalance(params: CommonQueryParams): AvailableBalanceFetchDetails{
    const { lazy } = params
    const [data, setData] = React.useState<AvailableBalanceData | undefined>()
    const [error, setError] = React.useState<string | undefined>()
    const [loading, setLoading] = React.useState<boolean>(false)

    const fetchData = React.useCallback(async() => {
        setLoading(true)
        try{
            // query params to be forwarded to the api
            const response = await fetchAvailableBalance()
            setData(response)
        }catch(err){
            setError(err as string)
        }finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if(!lazy){
            fetchData()
        }

    }, [lazy])

    return {
        data,
        error,
        loading,
        refetch: fetchData
    }
}

// can be extended to support more type of cards
export enum CardTypes {
    VISA = 'VISA',
    MASTERCARD = 'MASTERCARD',
    AMEX = 'AMEX'
  }

export interface CardDetails {
    name: string;
    cardNumber: string;
    validity: string;
    cvv: string;
    isFrozen: boolean;
    type: keyof typeof CardTypes;
    id: string
}

// Credit card information to be stored securly in BE in an encrypted fashion
// Only to be shown if user selects show credit card number option via RBAC based api

export const MOCK_CARD_DETAILS_LIST = [
    {
        name: 'Samarth Sharma',
        cardNumber: '1243687936478889',
        validity: '11/25',
        cvv: '123',
        isFrozen: false,
        type: CardTypes.VISA,
        id: '1'

    },
    {
        name: 'Smiti Yadav',
        cardNumber: '1243687936479878',
        validity: '11/25',
        cvv: '123',
        isFrozen: false,
        type: CardTypes.VISA,
        id: '2'

    },
    {
        name: 'William Frost',
        cardNumber: '1243687936474565',
        validity: '11/25',
        cvv: '123',
        isFrozen: false,
        type: CardTypes.VISA,
        id: '3'

    },
    {
        name: 'Robert Hill',
        cardNumber: '1243687936474857',
        validity: '11/25',
        cvv: '123',
        isFrozen: false,
        type: CardTypes.VISA,
        id: '4'

    }
]

export function useGetSavedCards(params: CommonQueryParams): SavedCardsFetchDetails{
    const { lazy } = params
    const [data, setData] = React.useState<CardDetails[] | undefined>()
    const [error, setError] = React.useState<string | undefined>()
    const [loading, setLoading] = React.useState<boolean>(false)

    const fetchData = React.useCallback(async() => {
        setLoading(true)
        try{
            // query params to be forwarded to the api
            const response = await fetchSavedCards()
            setData(response)
        }catch(err){
            setError(err as string)
        }finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if(!lazy){
            fetchData()
        }

    }, [lazy])

    return {
        data,
        error,
        loading,
        refetch: fetchData
    }
}