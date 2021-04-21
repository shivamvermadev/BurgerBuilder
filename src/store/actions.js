import axios from 'axios';

export const addIngredients = (name) => {
    return {
        type: 'ADD_INGREDIENT',
        ingredientName: name
    };
};

export const removeIngredients = (name) => {
    return {
        type: 'REMOVE_INGREDIENT',
        ingredientName: name
    };
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: 'PURCHASE_BURGER_SUCCESS',
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: 'PURCHASE_BURGER_FAIL',
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: 'PURCHASE_BURGER_START'
    }
}

export const purchaseBurger = (orderData, thisPropsHistory) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post("https://myburger-b6fec-default-rtdb.firebaseio.com/orders.json", orderData)
            .then((result) => {
                dispatch(purchaseBurgerSuccess(result.data, orderData));
                thisPropsHistory.replace("/");
            })
            .catch((err) => {
                dispatch(purchaseBurgerFail(err));
            })
    };
};

// Authentication 

export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: 'AUTH_SUCCESS',
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    
    return {
        type: "AUTH_LOGOUT"
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}


export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOimoNvE7OytrpCzAksQ3qYmUp3Knvk74";
        if(!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOimoNvE7OytrpCzAksQ3qYmUp3Knvk74"
        }

        axios.post(url, authData)
            .then((result) => {

                const expirationDate = new Date(new Date().getTime() + result.data.expiresIn * 1000);
                localStorage.setItem("token", result.data.idToken);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", result.data.localId);

                dispatch(authSuccess(result.data.idToken, result.data.localId));
                dispatch(checkAuthTimeout(result.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
                // console.log(err);
            })
    }
}

export const clearReduxOnLogout = () => {
    return {
        type: "CLEAR_REDUX"
    }
}

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if(!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(new Date() >= expirationDate) {
                dispatch(logout());
            }
            else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}