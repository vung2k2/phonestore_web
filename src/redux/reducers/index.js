import { combineReducers } from 'redux';
import info from './infoReducer.js';

const reducers = combineReducers({
    userInfo: info,
});

export default function (state, action) {
    return reducers(state, action);
}
