import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import {combineReducers, createStore} from "redux";
import {usernameReducer} from "./redux/reducers/UsernameReducer";
import {signedInReducer} from "./redux/reducers/SignedInReducer";

const rootReducer = combineReducers({
    usernameReducer,
    signedInReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store} >
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
