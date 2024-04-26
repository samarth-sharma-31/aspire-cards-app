import React from 'react'
import Button from '@mui/material/Button';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CreditCard } from './CardsCarousal';
import { CardTypes } from '../services/cards';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import { useSavedCardsContext } from '../context/SavedCardsContext';
import { SimpleSnackbar } from './SnackBar';
import useIsMobile from '../hooks/useIsMobile';



const defaultStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  px: '5.5%',
  py: '4.5%',
};


export const NewCardButton = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false)
    const isMobile = useIsMobile()

    const [cardHolderName, setCardHolderName] = React.useState<string>('')
    const [cardHelperText, setCardHelperText] = React.useState<string>('')

    const { saveCard } = useSavedCardsContext()

    const newCardDetailObj = {
        name: cardHolderName,
        cardNumber: '',
        validity: '11/25',
        cvv: '123',
        isFrozen: false,
        type: CardTypes.VISA,
        id: '10'

    }


    const handleCardSave = () => {

        if(cardHolderName){
            setCardHelperText('')
            saveCard({
                ...newCardDetailObj,
                name: cardHolderName,
                cardNumber: `${Math.floor(Math.random() * 10000)}`,
            })
            setIsSnackbarOpen(true)
            handleModalClose()
        }else{
            setCardHelperText('Name is required')
        }

    }

    const handleModalClose = () => {
        setCardHolderName('')
        setCardHelperText('')
        setOpen(false)
    }

    const updatedStyle = React.useMemo(() => {
        if(isMobile){
            return {
                ...defaultStyle,
                width: 'auto',
            }
        }else{
            return defaultStyle
        }

    }, [isMobile])

    return (
        <div className='flex items-end'>
            <SimpleSnackbar message='Card successfully saved!' isSnackbarOpen={isSnackbarOpen} setIsSnackbarOpen={(value) => setIsSnackbarOpen(value)} />
            <Button className='new-card-btn' size='small' onClick={handleOpen} startIcon={<AddCircleRoundedIcon />} variant="contained">New card</Button>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="add-new-card-modal-title"
                aria-describedby="add-new-card-modal-description"
            >
                <Box sx={updatedStyle}>
                    <div id="add-new-card-modal-title" className='add-new-card-modal-heading'>
                        Add New Card
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={`add-new-card-modal-content flex-col`}>
                            <div className='add-card-modal-card-container'>
                                <CreditCard isCardNumberCompletelyHidden={true} cardDetail={newCardDetailObj} />
                            </div>
                            <div className='add-card-modal-form-container'>
                                <TextField error={!!cardHelperText} helperText={cardHelperText} onChange={(event) => {
                                    setCardHelperText('')
                                    setCardHolderName(event.target.value)
                                }} fullWidth={true} id="outlined-basic" label="Card Holder Name" variant="outlined" />
                            </div>
                            <div className='add-card-modal-form-info flex'>
                                <InfoIcon className='mr-1 info-icon-modal' />
                                <div>Card number, Validity & CVV will get auto generated</div>
                            </div>
                            <div className='add-card-modal-action-buttons-container flex-col'>
                                <Button onClick={handleCardSave} className='new-card-btn save-card-btn' variant="contained" size='medium'>Save</Button>
                                <Button onClick={handleModalClose} className='new-card-btn cancel-card-btn' variant="contained" size='medium'>Cancel</Button>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}