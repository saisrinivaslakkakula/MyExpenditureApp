import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice'
const Header = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async() =>{
    try {
      await logoutApiCall().unwrap()
      dispatch(logout)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
    //dispatch(logout())
  }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand >My Budget Tracker</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link >Home</Nav.Link>
            </LinkContainer>
            
            {userInfo && (
              <>
              <LinkContainer to="/addExpense">
                <Nav.Link>Add Expense</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/addBudget">
                <Nav.Link>Add Budget</Nav.Link>
              </LinkContainer>
              </>
            )}
            
          </Nav>
          <Nav className="ml-auto">
                    {userInfo
                    ? 
                    <NavDropdown title={userInfo.name} id='user-name'>
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      
                    </NavDropdown>
                    :
                    <LinkContainer to="/login">
                    <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link>
                    </LinkContainer> 
                    }
                    
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default Header