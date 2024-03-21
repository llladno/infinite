import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case "SUCCESS":
            return {
                users: action.payload
            };
        default:
            return state;
    }
};

const FETCH_USERS = "FETCH_USERS";

const initialState: UserState = {
    users: [],
};

interface UserState {
    users: any[];
}

interface UserAction {
    type: string;
    payload?: any;
}

const rootReducer = combineReducers({
    user: userReducer
});

export const store: any = createStore(rootReducer);
