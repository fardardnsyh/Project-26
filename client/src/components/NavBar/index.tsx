import { Dispatch, SetStateAction } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '../Button';

import Auth from '../../utils/auth';

import './assets/style.css';

interface pageRoutingObj {
    name: string;
    location: string;
}

interface navBarIProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
    pageRoutingArr: pageRoutingObj[];
}

const NavBar = ({ isMobileMenuOpen, pageRoutingArr, setIsMobileMenuOpen }: navBarIProps) => {
    const loggedIn = Auth.loggedIn();
    let { pathname } = useLocation();

    const pageTitles = pageRoutingArr;

    const logout = () => {
        Auth.logout();
        window.location.assign('/login');
    }

    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    }

    return (
        <nav className={`absolute right-0 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:relative`}>
            <ul className='flex flex-col md:flex-row md:items-center'>
                {loggedIn && pageTitles.map((title, index) => (
                    <li className={'m-2 ' + (pathname === title.location ? 'font-bold tracking-wide' : '')} key={title.name} ><Link onClick={closeMenu} to={title.location}>{title.name}</Link></li>
                ))}

                {loggedIn ? (
                    <Button type="button" text="Log out" classes='primary ml-0 mt-4 md:mt-0 md:ml-3 text-gray-900 bg-white' onClick={logout} />
                ) : (
                    <Button type="button" text="Login" classes='primary ml-0 mt-4 md:mt-0 md:ml-3 text-gray-900 bg-white' onClick={() => window.location.assign('/login')} />
                )}
            </ul>
        </nav>
    );
}

export default NavBar;