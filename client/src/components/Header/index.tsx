import React, { useState } from 'react';

import Logo from '../Logo';
import NavBar from '../NavBar';
import ClosedNavMenu from './assets/icons8-menu-50.png';
import OpenNavMenu from './assets/icons8-close-60.png';

import './assets/style.css';

interface pageRoutingObj {
    name: string;
    location: string;
}

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navMenuClickHandler = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const routingObjArr: pageRoutingObj[] = [
        {
            name: 'Track.',
            location: '/tracker',
        },
        {
            name: 'Applied.',
            location: '/applied',
        },
        // {
        //     name: 'stats.',
        //     location: '/stats'
        // }
    ];

    return(
        <header className="drop-shadow-md">
            <div className="content flex text-white p-4 justify-between">
                <Logo />
                <img src={ isMobileMenuOpen ? OpenNavMenu : ClosedNavMenu } className='mobileNavMenu' onClick={navMenuClickHandler} alt=''/>
                <NavBar isMobileMenuOpen={isMobileMenuOpen} pageRoutingArr={routingObjArr}
                setIsMobileMenuOpen={setIsMobileMenuOpen}/>
            </div>
        </header>
    );
}

export default Header;