import {
    MENU_OPEN,
    LOGIN_DATA,
    REGISTER_DATA,
    CHANGE_PASSWORD_DATA,
    SET_AUTH
} from './action-types';

export function menuToggle() {
    return {
        type: MENU_OPEN
    }
}

export function setLoginData(email, password) {
    return function(dispatch) {
        dispatch({
            type: LOGIN_DATA,
            email: email,
            password: password
        });
    }
}

export function setRegisterData(email, password, repeatPassword) {
    return function(dispatch) {
        dispatch({
            type: REGISTER_DATA,
            email: email,
            password: password,
            repeatPassword: repeatPassword
        });
    }
}

export function setChangePasswordData(oldPassword, password, repeatPassword) {
    return function(dispatch) {
        dispatch({
            type: CHANGE_PASSWORD_DATA,
            oldPassword: oldPassword,
            password: password,
            repeatPassword: repeatPassword
        });
    }
}

export function auth() {
    return {
        type: SET_AUTH
    }
}
