import React from 'react';
import {connect} from 'react-redux'

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {createStructuredSelector} from "reselect";
import {selectHidden} from "../../redux/cart/cart.selector";
import {HeaderContainer, LogoLinkContainer, OptionLink, OptionsContiner} from "./header.styles";
import {signOutStart} from "../../redux/user/user.action";

const Header = ({currentUser, hidden, signOutStart}) => {
    return (
        <HeaderContainer>
            <LogoLinkContainer to='/'>
                <Logo/>
            </LogoLinkContainer>
            <OptionsContiner>
                <OptionLink to='/shop'>
                    Shop
                </OptionLink>
                <OptionLink to='/shop'>
                    Contact
                </OptionLink>
                {
                    currentUser ?
                        <OptionLink as='div' onClick={signOutStart}>
                            Sign Out
                        </OptionLink>
                        :
                        <OptionLink to='/signin'>Sign In</OptionLink>
                }
                <CartIcon/>
            </OptionsContiner>
            {
                hidden ? null :
                    <CartDropown/>
            }
        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);