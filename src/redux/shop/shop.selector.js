import {createSelector} from "reselect";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectShopCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(collectionKey => collections[collectionKey])
)

export const selectShopCollection = collectionUrlParam => {
    return createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam]
    )
}