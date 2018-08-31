import {CHECK_EMAIL, CHECK_PASSWORD} from '../constants/actionTypes';

const loginReducers = (state = [], action) => {
    switch (action.type) {
        case CHECK_EMAIL:
            const reg = /^[A-z0-9-]+@+[A-z0-9-]+?\.[A-z0-9-.]+/;
            
            if (!action.payload.replace(reg, '') && action.payload) {
                return {
                    ...state,
                    emailValid: true,
                    emailError: ''
                }
            } else {
                return {
                    ...state,
                    emailValid: false,
                    emailError: 'Email is invalid'
                }
            }            
        case CHECK_PASSWORD:
            if (action.payload.length >= 6) {
                return {
                    ...state,
                    passwordValid: true,
                    passwordError: ''
                }
            } else {
                return {
                    ...state,
                    passwordValid: false,
                    passwordError: 'Password is invalid'
                }
            }
        default: 
            return state;
    }
}

export default loginReducers;