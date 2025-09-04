import { combineReducers, legacy_createStore as createStore} from 'redux'
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customer/customerSlice';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})

const store = createStore(rootReducer);

export default store;

