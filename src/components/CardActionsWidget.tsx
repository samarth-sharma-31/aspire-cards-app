import React from 'react'
import { useSavedCardsContext } from '../context/SavedCardsContext'
import { CardDetails } from '../services/cards'
import unfreezeIcon from "../images/unfreeze.svg";
import freezeCardSvg from "../images/freeze-card.svg";
import setSpendLimitSvg from "../images/set-spend-limit.svg";
import gpaySvg from "../images/gpay.svg";
import replaceCardSvg from "../images/replace-card.svg";
import deactivateCardSvg from "../images/deactivate-card.svg";
import useIsMobile from '../hooks/useIsMobile';

export const CardActionsWidget = ({activeCardIndex}: {activeCardIndex: number}) => {
    const isMobile = useIsMobile()

    const { freezeCard, unFreezeCard, savedCards } = useSavedCardsContext()
    const isCurrentCardFrozen = savedCards[activeCardIndex]?.isFrozen

    const actionConfigList = React.useMemo(() => {
        return [
            {
                icon: isCurrentCardFrozen ? unfreezeIcon : freezeCardSvg,
                displayLabel: isCurrentCardFrozen ? 'Unfreeze card' : 'Freeze card',
                handleClick: () => {
                    if(isCurrentCardFrozen){
                        unFreezeCard(activeCardIndex)
                    }else{
                        freezeCard(activeCardIndex)
                    }
                },
                overrideCss: isCurrentCardFrozen ? 'unfreeze-icon' : 'freeze-icon'
            },
            {
                icon: setSpendLimitSvg,
                displayLabel: 'Set spend limit'
            },
            {
                icon: gpaySvg,
                displayLabel: 'Add to GPay'
            },
            {
                icon: replaceCardSvg,
                displayLabel: 'Replace card'
            },
            {
                icon: deactivateCardSvg,
                displayLabel: 'Cancel card'
            },
        ]
    }, [isCurrentCardFrozen, activeCardIndex])
    
    return (
        <div className={`${isMobile ? 'mobile-cards-actions-widget' : 'cards-actions-widget justify-between'} flex`}>{actionConfigList.map((actionConfig, index) => (
            <div key={actionConfig.displayLabel} onClick={actionConfig.handleClick} className={`action-container flex-col cursor-pointer ${actionConfig.overrideCss}-parent-container ${index !== actionConfigList.length - 1 ? 'action-container-right-margin' : ''}`}>
                <div className={`flex items-center justify-center mb-2`}>
                    {
                        isCurrentCardFrozen ? (
                            <div className={`${actionConfig.overrideCss}-container flex items-center justify-center`}>
                                <img className={actionConfig.overrideCss || 'action-icon'} src={actionConfig.icon}></img>
                            </div>
                        ) : (
                            <img className={actionConfig.overrideCss || 'action-icon'} src={actionConfig.icon}></img>
                        )
                    }
                </div>
                <div className={`action-label`}><div>{actionConfig.displayLabel}</div></div>
            </div>
        ))}</div>
    )
}