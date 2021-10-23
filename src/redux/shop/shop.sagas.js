import {takeLatest, call, put, all} from 'redux-saga/effects'
import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utility";
import {fetchCollectionFailure, fetchCollectionSuccess} from "./shop.action";

export function* fetchCollectionsAsync() {
    try {
        const collectionReference = firestore.collection('collections');
        const snapshot = yield collectionReference.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error.messages))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}