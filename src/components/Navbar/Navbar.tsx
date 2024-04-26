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

export default function Navbar() {
    const currentLocation = useLocation();
    return (
        <div className="navigation-container">
            <div className="company-logo-container mb-5">
                <img src={companyLogo} />
            </div>
            <div className="company-text text-left text-white opacity-30">
            Trusted way of banking for 3,000+ SMEs and startups in Singapore
            </div>
            <nav className="nav-items-container">
                <ul className="nav-items-list text-left">
                    {
                        NAV_ITEM_LIST.map(navItem => {
                            const isActive = currentLocation.pathname === navItem.href
                            return (
                                <div key={navItem.displayValue} className="nav-item-card flex mb-14">
                                    <Link to={navItem.href}>
                                        <img src={isActive ? navItem.selectedIcon : navItem.icon} />
                                    </Link>
                                    <li className="nav-item ml-4">
                                        <Link className={`nav-link ${isActive ? 'active-nav-link' : 'text-white'}`} to={navItem.href}>
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
