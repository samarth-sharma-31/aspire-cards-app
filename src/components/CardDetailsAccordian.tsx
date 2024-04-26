import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import cardDetailsSvg from "../images/card-details-accordian.svg";
import downArrowSvg from "../images/down-arrow.svg";

export const CardDetailsAccordian = () => {
    return (
        <div className='card-details-accordian mt-8 mb-6'>
            <Accordion className='card-details-accordian-main'>
                <AccordionSummary
                expandIcon={<img src={downArrowSvg} />}
                className='card-details-accordian-summary'
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <img className='mr-3' src={cardDetailsSvg}></img>  Card details
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}