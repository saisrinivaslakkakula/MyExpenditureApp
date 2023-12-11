import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify';
import { budget as budgetState } from '../slices/budgetSlice';
import { useAddBudgetMutation } from '../slices/budgetApiSlice';
import CategoryBudgetPieChart from '../components/CategoryBudgetPieChart'
import BudgetExpenseBarChart from '../components/BudgetExpenseBarChart'
import ExpenseHistoryChart from '../components/ExpenseHistoryChart'

import { Chart } from "react-google-charts";
import axios from 'axios'
const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector((state)=> state.auth);
    const redirect = "/login";
    const [categories,setAllCategories] = useState([])
    const [expenses,setExpenses] = useState([])

    const getAllCategories = async () =>{
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

    const getAllExpenses = async() => {

        if(userInfo){
            const config = {
                headers: {
                  Authorization: userInfo.token,
                },
              };
    
            const expensessByUserId = await axios.get(`/api/v1/budget/expense`,config);
            const {data} = expensessByUserId;
            if(data){
                setExpenses(data)
            }
        }

    }

    useEffect(()=>{
        if (!userInfo) {
            navigate(redirect);
        }
        getAllCategories();
        getAllExpenses();
        
    }, [userInfo, redirect, navigate])

    return (
        <Container fluid>
      <Row className="mt-4">
        <Col xs={12} md={12}>
          <div className="sub-container">
            {/* Add your chart or content here */}
            <h2>Chart 1</h2>
            {categories && categories.length ?(
                <CategoryBudgetPieChart categories={categories}/>
            ):(<p>No data</p>)}
             
          </div>
        </Col>
        
      </Row>
      <Row className='="mt-4'>

      <Col xs={12} md={12}>
          <div className="sub-container">
            {/* Add your chart or content here */}
            <h2>Chart 2</h2>
            {categories && categories.length ?(
                <BudgetExpenseBarChart categories={categories} expenses={expenses} />
            ):(<p>No data</p>)}
          </div>
        </Col>

      </Row>
      <Row className="mt-4">
        <Col xs={12} md={12}>
          <div className="sub-container">
            {/* Add your chart or content here */}
            <h2>Chart 3</h2>
            {categories && categories.length ?(
                 <ExpenseHistoryChart categories={categories} expenses={expenses} />
            ):(<p>No data</p>)}
          </div>
        </Col>
      </Row>
    </Container>
    )

}

export default HomeScreen;