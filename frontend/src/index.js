import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
import  {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider

} from 'react-router-dom'

import LoginScreen from './screens/login';
import SignUpScreen from './screens/signUp';
import AddBudgetScreen from './screens/addBudget';
import AddExpenseScreen from './screens/addExpense';
import HomeScreen from './screens/homeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' index={true} element={<HomeScreen/>}></Route>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/register" element={<SignUpScreen/>}/>
      <Route path="/addBudget" element={<AddBudgetScreen/>}/>
      <Route path="/addExpense" element={<AddExpenseScreen/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <React.StrictMode>
        <Provider store={store}>
        <RouterProvider router={router}/>
        </Provider>
          
      </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
