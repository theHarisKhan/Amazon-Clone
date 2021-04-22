import React from 'react'
import './Header.css'
import SearchIcon from './SearchIcon.png'
import AddCartIcon from './carticon.png'
import {Link} from 'react-router-dom'
import { useStateValue } from '../ContextAPI/StateProvider'
import { auth } from '../firebase'

function Header() {
    const [{ basket, user }, dispatch] = useStateValue()

    const handleAuth = () => {
        if(user)
            auth.signOut()
    }

    return (
        <div className="header">

            <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" className="logo"/>
            </Link>

            <div className="header__search">
                <input type="text" className="search__input"/>
                <img src={SearchIcon} alt="icon" className="search__icon"/>
            </div>

            <div className="header__nav">

                <Link to={!user && "/LogIn" }>
                    <div className="header__option" onClick={handleAuth}>
                        <span className="option__toptxt">
                            Hello 
                        </span>
                        <span className="option__bottomtxt">
                            {user ? 'Sign Out' : 'Sign in'}
                        </span>
                    </div>
                </Link>

                <div className="header__option">
                    <span className="option__toptxt">
                        Returns
                    </span>
                    <span className="option__bottomtxt">
                        &amp; Orders
                    </span>
                </div>

                <Link to="/checkout">  
                    <div className="header__addCart__option">
                        <img src={AddCartIcon} alt="" className="addCart__icon"/>

                        <span className="cart__Items">{basket?.length}</span>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default Header
