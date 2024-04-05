const initState = {
    cartItems: [],
};

export const CHECK_OUT = 'CHECK_OUT';

export default function checkoutItems(state = initState, action) {
    switch (action.type) {
        case CHECK_OUT:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        default:
            return state;
    }
}
