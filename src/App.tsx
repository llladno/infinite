import React from 'react';
import './App.css';
import UserList from "./components/UserList";
import UserInfo from "./components/UserInfo";
import {Provider} from "react-redux";
import {store} from "./state/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <UserList></UserList>
                <UserInfo></UserInfo>
            </div>
        </Provider>
    );
}

export default App;
