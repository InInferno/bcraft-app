import {
    MENU_OPEN,
    LOGIN_DATA,
    REGISTER_DATA,
    CHANGE_PASSWORD_DATA,
    SET_AUTH
} from '../actions/action-types';

const initialState = {
    menuOpen: false,
    loginData: {},
    registerData: {},
    changePasswordData: {},
    isAuth: false
};
  
export const reducers = (state = initialState, action) => {
    switch (action.type) {

        case MENU_OPEN: {
            return {
                ...state,
                menuOpen: !state.menuOpen
            };
        }
        case LOGIN_DATA: {
            return {
                ...state,
                loginData: {
                    email: action.email, 
                    password: action.password
                }
            };
        }
        case REGISTER_DATA: {
            return {
                ...state,
                registerData: {
                    email: action.email, 
                    password: action.password,
                    repeatPassword: action.repeatPassword,
                }
            };
        }
        case CHANGE_PASSWORD_DATA: {
            return {
                ...state,
                changePasswordData: {
                    oldPassword: action.oldPassword, 
                    password: action.password,
                    repeatPassword: action.repeatPassword,
                }
            };
        }
        case SET_AUTH: {
            return {
                ...state,
                isAuth: !state.isAuth
            };
        }
        default: {
            return state;
        }
    }
};
