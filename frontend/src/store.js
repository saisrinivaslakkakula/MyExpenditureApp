import { configureStore } from '@reduxjs/toolkit'
import { apislice } from './slices/apiSlice' 
import authSliceReducer from './slices/authSlice'
import budgetSliceReducer from './slices/budgetSlice'

const store = configureStore({
    reducer:{
        [apislice.reducerPath]: apislice.reducer,
        auth: authSliceReducer,
        budget: budgetSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apislice.middleware),
    devTools: true
})


/*import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import {userRegisterReducer} from './reducers/userReducers'

const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const reducer = combineReducers({
    userRegister : userRegisterReducer,

})

const initialState = {
    userLogin: {
        userInfo:userInfoFromStorage,
    }
}

const middleWare = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))

)
*/

export default store