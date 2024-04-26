import React from 'react';
import { Link } from 'react-router-dom'
import companyLogo from "../../images/company-logo.svg";

export default function Error (){

    return (
        <div className='error-page'>
            <div className="company-logo-container mb-5 flex justify-center">
                <img src={companyLogo} />
            </div>
            <h1>Page not found</h1>
            <h2>Click <Link className="nav-link" to="/"><u>here</u></Link> to navigate to Home Page</h2>
        </div>
    )
}