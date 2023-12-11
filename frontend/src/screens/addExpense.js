import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import { expense as expenseState } from '../slices/budgetSlice';
import FormContainer from '../components/FormContainer'
import { useAddExpenseMutation } from '../slices/budgetApiSlice'
import axios from 'axios'
const AddExpenseScreen = () => {
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [amount,setAmount] = useState(0)
    const [allCategories,setAllCategories] = useState([])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addExpense, {isLoading}] = useAddExpenseMutation()
    const {userInfo} = useSelector((state)=> state.auth);
    const redirect = "/";

    const getCategoriesByUserId = async ()=>{
        if(userInfo){
            const config = {
                headers: {
                  Authorization: userInfo.token,
                },
              };
    
            const categoriesByUserId = await axios.get(`/api/v1/budget/category`,config);
            const {data} = categoriesByUserId;
            if(data){
                setAllCategories(data)
            }
        }
        
    }
    useEffect(()=>{
        if (!userInfo){
            navigate("/login")
        }
        
        getCategoriesByUserId();
        //
    },[userInfo,navigate])
     
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            const {token} = userInfo
            console.log(token)
            const res = await addExpense(
                {
                    body:{category, description, amount},
                    token:token
                })
                .unwrap();
            const {success, message, data} = res;
            //console.log(data)
            dispatch(expenseState({...res}));
            if (success) {
                toast(message)
            }
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
    }

    return (
        <FormContainer>
            <h1>Create Category </h1>
            <Form onSubmit = {submitHandler}>
            {/*isLoading && <Loader></Loader>*/}
            <Form.Group controlId='name'>
                {console.log(allCategories)}
                    <Form.Label> Category:</Form.Label>
                    <Form.Select aria-label="select category" value={category} onChange={handleCategoryChange}>
                    <option>Select Category</option>
  
                    {allCategories.map((item) => (
                        <option key={item._id} value={item._id}>
                        {item.name}
                        </option>
                    ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId='description'>
                    <Form.Label> Desription:</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='amount'>
                    <Form.Label> Amount:</Form.Label>
                    <Form.Control type="number" placeholder="Enter Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant="primary">
                    Add
                </Button>
            </Form>
        </FormContainer>
    )

}

export default AddExpenseScreen;