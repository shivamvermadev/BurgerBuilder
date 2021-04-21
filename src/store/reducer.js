const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 5,
    meat: 10,
    bacon: 10
};

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 10,
    orders: [],
    loading: false
}


const reducer = (state = initialState, action) => {
    
    if (action.type === "ADD_INGREDIENT") {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        };
    }
    else if (action.type === "REMOVE_INGREDIENT") {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
    }
    else if (action.type === 'PURCHASE_BURGER_SUCCESS') {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        return {
            ...state,
            // loading: false,
            // orders: state.orders.concat(newOrder)
            ingredients: {
                salad: 0,
                meat: 0,
                bacon: 0,
                cheese: 0
            },
            totalPrice: 10,
            loading: false
        }
    }
    else if (action.type === 'PURCHASE_BURGER_FAIL') {
        return {
            ...state,
            loading: false
        }
    }
    else if (action.type === 'PURCHASE_BURGER_START') {
        return {
            ...state,
            loading: true
        }
    }
    else if (action.type === 'CLEAR_REDUX') {
        return {
            ...state,
            // loading: false,
            // orders: state.orders.concat(newOrder)
            ingredients: {
                salad: 0,
                meat: 0,
                bacon: 0,
                cheese: 0
            },
            totalPrice: 10,
            loading: false
        }
    }
    return state;
}

export default reducer;