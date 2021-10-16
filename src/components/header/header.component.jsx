import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from "../../firebase/firebase.utility";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {createStructuredSelector} from "reselect";
import {selectHidden} from "../../redux/cart/cart.selector";

const Header = ({currentUser, hidden}) => {
    return (
        <div className="header">
            <Link className='logo-container' to='/'>
                <Logo className="logo"/>
            </Link>
            <div className="options">
                <Link className="option" to='/shop'>
                    Shop
                </Link>
                <Link className="option" to='/shop'>
                    Contact
                </Link>
                {
                    currentUser ?
                        <div
                            className='option'
                            onClick={() => auth.signOut()}
                        >
                            Sign Out
                        </div>
                        :
                        <Link className='option' to='/signin'>Sign In</Link>
                }
                <CartIcon/>
            </div>
            {
                hidden ? null :
                    <CartDropown/>
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectHidden
});

export default connect(mapStateToProps)(Header);