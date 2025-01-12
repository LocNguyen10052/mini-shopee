import { takeLatest, call, all, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user-reducer";
import { createAdmin, createUser, getCurrentUser, signInAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPasswordAdmin, signInWithGoogleAccountPopUp, signOutUser } from "../../utils/firebase.utils";
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess } from "./user-action";

//user
export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userSnapshot = yield call(createUser, userAuth);
        if (userSnapshot.data().role === "user") {
            yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        }
        else {
        }
    } catch (error) {
        yield put(signInFailed(error));
    }
}

//admin
export function* getSnapshotFromUserAuthAdmin(userAuth) {
    try {
        const userSnapshot = yield call(createAdmin, userAuth);
        if (userSnapshot.data().role === "admin") {
            yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        }
        else {
        }
    } catch (error) {
        yield put(signInFailed(error));
    }
}

//user
export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

//admin
export function* isUserAuthenticatedAdmin() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuthAdmin, userAuth);
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

export function* signInWithEmailPasswordAdmin({ payload: { email, password } }) {
    try {
        const { user } = yield call(signInAuthUserWithEmailAndPasswordAdmin, email, password);
        yield call(getSnapshotFromUserAuthAdmin, user)
    } catch (error) {
        console.log(error)
        yield put(signInFailed(error));

    }
}

export function* onCheckSessionAdmin() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION_ADMIN, isUserAuthenticatedAdmin);
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

export function* onSignInWithEmailPasswordAdmin() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START_ADMIN, signInWithEmailPasswordAdmin);
}

export function* userSaga() {
    console.log("userSaga");
    yield all([
        call(onCheckSession),
        call(onSignOut),
        call(onSignInWithEmailPassword),
        call(onCheckSessionAdmin),
        call(onSignInWithEmailPasswordAdmin),
        call(onGoogleSignIn)]);
}