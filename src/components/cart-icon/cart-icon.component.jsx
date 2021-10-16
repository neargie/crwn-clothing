import React from 'react';

import {ReactComponent as ShoppingCart} from "../../assets/shopping-bag.svg";

import './cart-icon.styles.scss'
import {connect} from "react-redux";
import {toggleCartHidden} from "../../redux/cart/cart.action";
import {selectCartItemCount} from "../../redux/cart/cart.selector";
import {createStructuredSelector} from "reselect";

const CartIcon = ({toggleCartHidden, countItem}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingCart className="shoppiig-icon"/>
        <span className="item-count">{countItem}</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    countItem: selectCartItemCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);