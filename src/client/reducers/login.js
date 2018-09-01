import {CHECK_EMAIL, CHECK_PASSWORD} from '../constants/actionTypes';

const loginReducers = (state = [], action) => {
    switch (action.type) {
        case CHECK_EMAIL:
            let condition = 1;

            /* Данную проверку добавил по причине того, что после символа "@" все русские символы заменяются на
            коды, которые в дальнейшем проходят проверку регулярным выражением. К сожалению не получилось придумать
            другого способа для исправления этой проблемы.  */
            if (/xn--/.test(action.payload)) {
                condition = -1;
            }

            const reg = /^[0-9a-z]*[0-9a-z-.]*[0-9a-z]\@[0-9a-z][0-9a-z-]+\.*[0-9a-z-.]*[0-9a-z]/i;
            
            if (!action.payload.replace(reg, '') && action.payload && condition == 1) {
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