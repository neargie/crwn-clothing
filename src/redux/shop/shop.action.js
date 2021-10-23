import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utility";


export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})

export const fetchCollectionSuccess = collectionMap => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionReference = firestore.collection('collections');
        dispatch(fetchCollectionStart());

        collectionReference.get()
            .then(snapshot => {
                const collectionsSnapshotToMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionSuccess(collectionsSnapshotToMap));
            })
            .catch(error => dispatch(fetchCollectionFailure(error.messages)));
    }
}