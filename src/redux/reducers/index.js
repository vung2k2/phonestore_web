import { combineReducers } from 'redux';
import info from './infoReducer.js';
import login from './loginReducer.js';
import checkoutItems from './checkout.js';

const reducers = combineReducers({
    userInfo: info,
    login: login,
    checkoutItems: checkoutItems,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state, action) {
    return reducers(state, action);
}
