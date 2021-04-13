import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt="Logo" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {loggedInUser.email ? <button onClick={() => setLoggedInUser({})}>Sign Out</button> 
                    :   <Link to="/login"><button>Sign In</button></Link>
                }  
            </nav>
        </div>
    );
};

export default Header;