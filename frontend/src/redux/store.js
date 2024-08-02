import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'; // Correct named import
import authReducer from './reducers/authReducer';
import transactionReducer from './reducers/transactionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  transactions: transactionReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
