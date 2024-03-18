const initState = {
    login: false,
};

export const LOGIN = 'LOGIN';

export default function login(state = initState, payload) {
    switch (payload.type) {
        case LOGIN:
            return {
                ...state,
                login: payload.login,
            };
        default:
            return state;
    }
}
