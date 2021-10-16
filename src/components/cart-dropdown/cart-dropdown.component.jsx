import React from 'react';

import './cart-dropdown.styles.scss'
import CustomButton from "../custom-button/custom-button.compoenent";
import {connect} from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selector";
import {withRouter} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {toggleCartHidden} from "../../redux/cart/cart.action";

const CartDropown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                    cartItems.map(item => (
                        <CartItem key={item.id} item={item}/>
                    )) : <span className="empty-message">Cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }}>CHECKOUT</CustomButton>
    </div>
);
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropown));