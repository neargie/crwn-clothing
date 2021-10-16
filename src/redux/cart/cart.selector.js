import {createSelector} from "reselect";

const selectCart = state => state.cart // cart is from root reducer

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems // cartItems from cart.reducer
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
);

export const selectHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

export const selectTotalPrice = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce((accumalatedQuantity, cartItem) =>
            accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
)