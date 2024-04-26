import React from 'react';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface CardActionModalProps {
    isModalOpen: boolean
    handleModalClose: () => void
    ariaLabel?: string
    modalStyles?: Record<string, string>
    title: string
    modalContent: React.ComponentType<any>
}

const DEFAULT_STYLES = {
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

export function CardActionModal(props: CardActionModalProps){
    const { isModalOpen, handleModalClose, ariaLabel = 'modal-aria-info', modalStyles = DEFAULT_STYLES, title, modalContent: ModalContent} = props

    return (
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby={`add-new-card-modal-title`}
            >
                <Box sx={modalStyles}>
                    <div id="add-new-card-modal-title" className='add-new-card-modal-heading'>
                        {title}
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className={`add-new-card-modal-content flex-col`}>
                            <ModalContent />    
                        </div>
                    </Typography>
                </Box>
            </Modal>
    )
}