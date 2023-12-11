import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify';

import FormContainer from '../components/FormContainer'
import { useRegisterMutation } from '../slices/usersApiSlice'
const SignUpScreen = () => {
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector((state)=> state.auth);
    const redirect = "/";

    useEffect(()=>{
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(password!== confirmPassword){
          setMessage("Passwords Do Not Match")
        }
        else {
            try {
                const res = await register({username, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up </h1>
            <Form onSubmit = {submitHandler}>
            {isLoading && <Loader></Loader>}
            <Form.Group controlId='name'>
                    <Form.Label> user Name:</Form.Label>
                    <Form.Control type="username" placeholder="Enter your user name" value={username} onChange={(e)=>setUserName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label> Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your pasword" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Confirm Password:</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your pasword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant="primary">
                    Sign Up
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                Already Customer? 
                <Link to='/login'>
                     Login Here
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )

}

export default SignUpScreen;