import {BrowserRouter as Router, Outlet} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SignUpScreen from './screens/signUp';
import LoginScreen from './screens/login';
import AddBudgetScreen from './screens/addBudget'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Container} from 'react-bootstrap'

function App() {
  return (
    <>
    <Header></Header>
    <main className='py-5'>
      <Container>
        <Outlet/>  
      </Container>
    </main>
    <Footer/>
    <ToastContainer/>
    </>
  );
}

export default App;
