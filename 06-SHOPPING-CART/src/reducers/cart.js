export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

//objeto de actones redux
export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
}

//funcion que actualiza el localstorage
export const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        const { id } = action.payload
        const productCartIndex = state.findIndex(item => item.id === id)

        if (productCartIndex >= 0) {
            const newState = [
                ...state.slice(0, productCartIndex),
                { ...state[productCartIndex], quantity: state[productCartIndex].quantity + 1 },
                ...state.slice(productCartIndex + 1)
            ]
            updateLocalStorage(newState)
            return newState
        }
        const newState = [
            ...state,
            {
                ...action.payload, //product
                quantity: 1
            }
        ]

        updateLocalStorage(newState)
        return newState
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
        const { id } = action.payload
        const newState = state.filter(item => item.id !== id)
        updateLocalStorage(newState)
        return newState
    },
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
        updateLocalStorage([])
        return []
    }
}

export const cartReducer = (state, action) => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action) : state
}
