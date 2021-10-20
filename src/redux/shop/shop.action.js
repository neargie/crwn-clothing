import ShopActionTypes from "./shop.types";

export const handleUpdateCollection = collections => {
    return {
        type: ShopActionTypes.UPDATE_COLLECTIONS,
        payload: collections
    }
}