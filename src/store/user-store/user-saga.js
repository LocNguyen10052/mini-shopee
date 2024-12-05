import { takeLatest, call, all, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user-reducer";
import { createUser, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGoogleAccountPopUp, signOutUser } from "../../utils/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess } from "./user-action";

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userSnapshot = yield call(createUser, userAuth);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}
export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGoogleAccountPopUp);
        yield call(getSnapshotFromUserAuth, user)

    } catch (error) {

        yield put(signInFailed(error));
    }
}
export function* signInWithEmailPassword({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        yield call(getSnapshotFromUserAuth, user)

    } catch (error) {
        console.log(error)
        yield put(signInFailed(error));

    }
}

export function* onCheckSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* onGoogleSignIn() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onSignInWithEmailPassword() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailPassword);
}

export function* userSaga() {
    console.log("userSaga");
    yield all([
        call(onCheckSession),
        call(onSignOut),
        call(onSignInWithEmailPassword),
        call(onGoogleSignIn)]);
}