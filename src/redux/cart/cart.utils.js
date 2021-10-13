export const addItemToCart = (cartItems, cartItemToAdd) => {
    const sameItems = cartItems.find(item => item.id === cartItemToAdd.id);

    if (sameItems) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ?
                {...cartItem, quantity: cartItem.quantity + 1} :
                cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}