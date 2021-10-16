export const addItemToCart = (cartItems, cartItemToAdd) => {
    const sameItem = cartItems.find(item => item.id === cartItemToAdd.id);

    if (sameItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} :
                cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const sameItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (sameItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== sameItem.id)
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id ?
            {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    );
}