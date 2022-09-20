import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { SpinnerCircular } from 'spinners-react';


const Header = styled.div`
    background: #fee381;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 2rem;
    width: 70%;
    position: fixed;
    top: 0;
`
const Container = styled.div`
    position: relative;
    padding-top: 10vh;
`

const Wrap = styled.div`
    background: #ddd;
    display: flex;
    justify-content: space-between;
    padding: 0 2em;
    align-items: center;
    border: 1px solid #000;
    font-weight: bold;
    margin: 1em 2em;
    cursor: pointer;
`

const Input = styled.input`
    margin: 0 2em;
    padding: .8em 3em;
    border-style: none;
    border-radius: 1.5em;
    font-size: 1rem
`
const SpinnerContainer = styled.div`
    position: relative;
    padding-top: 10vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

function OnLoan() {
    
    let navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // function userDetails(id) {
    //     window.location.href = `customer/${id}`
    // }
    

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios.get('https://purposetrustapi.herokuapp.com/api/user/get/all').then((res) => {
        console.log(res.data['results'])
        const data = Array.from(res.data['results'])
        setCustomers(data.filter((customer) => customer['onLoan']))
        setLoading(false)
    }).catch((err) => {
        console.log(err)
        setLoading(false)
    })
        
    }, [])

  return (
    <Container>
        <Header>ALL CUSTOMERS ON LOAN <Input onChange={e => setSearch(e.target.value)} type='number' value={search} placeholder='Search Customer' /></Header>
        {
            loading ? <SpinnerContainer> <SpinnerCircular enabled={loading} /> </SpinnerContainer>: customers.length === 0 ? <h1 style={{textAlign: 'center'}}>No Customers on Loan</h1> : customers.filter(
                (val) => {
                    if(search === '') {
                        return val;
                    } else if(val['phoneNumber'].includes(search) || val['cardNumber'].includes(search)) {
                        return val
                    }
                }
            ).map((customer) => <Wrap onClick={() => navigate(`/dashboard/customer/${customer["_id"]}`)} key={customer["cardNumber"]}>
                <p>{customer["firstName"]} {customer["lastName"]} </p>
                <p> {customer['phoneNumber']} </p>
                <p> {customer["cardNumber"]} </p>
                </Wrap>)
        }
    </Container>
  )
}

export default OnLoan