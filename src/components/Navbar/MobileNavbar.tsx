import { Link, useLocation } from 'react-router-dom'
import companyLogo from "../../images/company-logo.svg";
import homeSvg from "../../images/home.svg";
import cardLogo from "../../images/card.svg";
import paymentsLogo from "../../images/payments.svg";
import creditLogo from "../../images/credit.svg";
import settingsLogo from "../../images/settings.svg";

import homeSelectedSvg from "../../images/home-selected.svg";
import cardSelectedLogo from "../../images/card-selected.svg";
import paymentsSelectedLogo from "../../images/payments-selected.svg";
import creditSelectedLogo from "../../images/credit-selected.svg";
import settingsSelectedLogo from "../../images/settings-selected.svg";
import useIsMobile from '../../hooks/useIsMobile';

// Using nav tag here gives accessibility benefits by aiding screen readers in identifying primary navigation areas

const NAV_ITEM_LIST = [
    {
        displayValue: 'Home',
        icon: homeSvg,
        selectedIcon: homeSelectedSvg,
        href: '/'
    },
    {
        displayValue: 'Cards',
        icon: cardLogo,
        selectedIcon: cardSelectedLogo,
        href: '/cards'
    },
    {
        displayValue: 'Payments',
        icon: paymentsLogo,
        selectedIcon: paymentsSelectedLogo,
        href: '/payments'
    },
    {
        displayValue: 'Credit',
        icon: creditLogo,
        selectedIcon: creditSelectedLogo,
        href: '/credit'
    },
    {
        displayValue: 'Settings',
        icon: settingsLogo,
        selectedIcon: settingsSelectedLogo,
        href: '/settings'
    },
]

export default function MobileNavbar() {
    const currentLocation = useLocation();
    const isMobile = useIsMobile()
    return (
        <div className="mobile-navigation-container">
            <nav className="nav-items-container">
                <ul className="mobile-nav-items-list p-2 text-left">
                    {
                        NAV_ITEM_LIST.map(navItem => {
                            const isActive = currentLocation.pathname === navItem.href
                            return (
                                <div className={`flex-col ${isMobile ? 'grow' : 'mr-2'}`}>
                                    <div className='flex justify-center items-center'>
                                        <Link to={navItem.href}>
                                            <img src={isActive ? navItem.selectedIcon : navItem.icon} />
                                        </Link>
                                    </div>
                                    <li className="nav-item ml-4">
                                        <Link className={`nav-link ${isActive ? 'active-nav-link' : 'text-grey'}`} to={navItem.href}>
                                            {navItem.displayValue}
                                        </Link>
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
