import {all, call, put, takeLatest} from "redux-saga/effects";
import {clearCart} from "./cart.action";
import UserActionTypes from "../user/user.types";

export function* clearCartOnSignOut() {
    yield put(clearCart())
}

export function* onClearCart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield all([call(onClearCart)])
}