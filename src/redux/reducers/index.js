import { combineReducers } from 'redux';
import info from './infoReducer.js';
import login from './loginReducer.js';

const reducers = combineReducers({
    userInfo: info,
    login: login,
});

export default function (state, action) {
    return reducers(state, action);
}
