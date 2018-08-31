import {CHECK_EMAIL, CHECK_PASSWORD} from '../constants/actionTypes';

export const checkEmail = (emailValue) => (
    {
        type: CHECK_EMAIL,
        payload: emailValue
    }
)

export const checkPassword = (passwordValue) => (
    {
        type: CHECK_PASSWORD,
        payload: passwordValue
    }
)