import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { useSavedCardsContext } from '../context/SavedCardsContext';
import { CardsCarousal } from './CardsCarousal';
import { CardActionsWidget } from './CardActionsWidget';
import { CardDetailsAccordian } from './CardDetailsAccordian';
import { RecentTransactionsAccordian } from './RecentTransactionsAccordian';
import Skeleton from '@mui/material/Skeleton';
import useIsMobile from '../hooks/useIsMobile';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


interface CustomTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function CustomTabPanel(props: CustomTabPanelProps) {
    const { children, value, index, ...other } = props;
    const isMobile = useIsMobile()
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Paper square={false} elevation={2} className={`${isMobile ? 'mobile-card-container-wrapper mt-2' : 'card-container-wrapper mt-3'}`}>
            {children}
          </Paper>
        )}
      </div>
    );
}

export const CardsCarousalWrapper = ({handleCardIndexUpdate}: {handleCardIndexUpdate: (index: number) => void}) => {
    const {savedCards, savedCardsLoading} = useSavedCardsContext()
    const isMobile = useIsMobile()
    const [shouldShowCardNumber, setShouldShowCardNumber] = React.useState(false);
    
    return (
        <div className='cards-carousal-wrapper flex-col mb-8'>
            <div className='show-card-number-row flex justify-end mb-2 cursor-pointer'>
                <div className='show-card-number-icon-container'>
                  {
                    shouldShowCardNumber ? (
                      <VisibilityOffIcon className='show-card-number-icon' />
                    ) : (
                      <RemoveRedEyeRoundedIcon className='show-card-number-icon' />
                    )
                  }
                </div>
                <div className='show-card-number-label' onClick={() => setShouldShowCardNumber(prevValue => !prevValue)}>
                    {shouldShowCardNumber ? 'Hide card number' : 'Show card number'}
                </div>
            </div>
            <div className='cards-carousal-container-wrapper'>
                {
                    savedCardsLoading ? (
                        <Skeleton animation="wave" variant="rectangular" height={282} />
                    ) : (
                        <CardsCarousal shouldShowCardNumber={shouldShowCardNumber} cards={savedCards} handleCardIndexUpdate={handleCardIndexUpdate} />
                    )
                }
            </div>
        </div>
    )
}

function MyDebitCardsTabContent(){
    const isMobile = useIsMobile()
    const [cardActiveIndex, setCardActiveIndex] = React.useState<number>(0)
    const handleCardIndexUpdate = (activeIndex: number) => {
        setCardActiveIndex(activeIndex)
    }
    return(
        <div className={`my-debit-cards-content-container ${isMobile ? 'flex-col mb-20' : 'flex justify-between'}`}>
                <div className={`cards-carousal-and-actions-container flex-col grow ${isMobile ? '' : 'cards-carousal-and-actions-container-desktop'}`}>
                    <CardsCarousalWrapper handleCardIndexUpdate={handleCardIndexUpdate} />
                    <CardActionsWidget activeCardIndex={cardActiveIndex} />
                </div>
                <div className={`${isMobile ? 'cards-details-and-transactions-container' : 'cards-details-and-transactions-container'} flex-col grow`}>
                    <CardDetailsAccordian />
                    <RecentTransactionsAccordian />
                </div>
        </div>
    )
}

function accessibilityProps(index: number) {
    return {
      id: `card-tab-${index}`,
      'aria-controls': `card-tabpanel-${index}`,
    };
}



export default function CardsTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <div style={{ width: '100%' }}>
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab className='cards-tab-label selected-card-tab' label="My debit cards" {...accessibilityProps(0)} />
            <Tab className='cards-tab-label disabled-card-tab' disabled={true} label="All company cards" {...accessibilityProps(1)} />
          </Tabs>
        </div>
        <CustomTabPanel value={value} index={0}>
          <MyDebitCardsTabContent />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        This is tab panel 2
        </CustomTabPanel>
      </div>
    );
  }