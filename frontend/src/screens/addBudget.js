import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import { budget as budgetState } from '../slices/budgetSlice';
import FormContainer from '../components/FormContainer'
import { useAddBudgetMutation } from '../slices/budgetApiSlice'
const AddBudgetScreen = () => {
    const [category,setCategory] = useState('')
    const [budget,setBudget] = useState(0)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addBudget, {isLoading}] = useAddBudgetMutation()
    const {userInfo} = useSelector((state)=> state.auth);
    const redirect = "/";

    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const {token} = userInfo
            console.log(token)
            const res = await addBudget(
                {
                    body:{name:category, budget},
                    token:token
                })
                .unwrap();
            const {success, message, data} = res;
            dispatch(budgetState({...res}));
            if (success) {
                toast(message)
            }
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <FormContainer>
            <h1>Create Category </h1>
            <Form onSubmit = {submitHandler}>
            {/*isLoading && <Loader></Loader>*/}
            <Form.Group controlId='name'>
                    <Form.Label> Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label> Budget:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Budget" value={budget} onChange={(e)=>setBudget(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant="primary">
                    Add
                </Button>
            </Form>
        </FormContainer>
    )

}

export default AddBudgetScreen;