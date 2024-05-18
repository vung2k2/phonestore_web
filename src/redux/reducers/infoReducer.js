const initState = {
    name: '',
    email: '',
    address: '',
    phone: '',
};

export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_PHONE = 'UPDATE_PHONE';

export default function updateInfo(state = initState, payload) {
    switch (payload.type) {
        case UPDATE_NAME:
            return {
                ...state,
                name: payload.name,
            };
        case UPDATE_EMAIL:
            return {
                ...state,
                email: payload.email,
            };
        case UPDATE_ADDRESS:
            return {
                ...state,
                address: payload.address,
            };
        case UPDATE_PHONE:
            return {
                ...state,
                phone: payload.phone,
            };
        default:
            return state;
    }
}
