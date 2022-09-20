import React, { useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';
import {useNavigate, useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';


const Container = styled.div`
    background: #f5f5f5;
`

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

const Div = styled.div`
    padding: 10vh 1em;
`
const Para = styled.p`
    background: #ddd;
    padding: 1em;
    font-weight: bold;
    text-transform: capitalize;
`
const Div2 = styled.div`
    display: flex;
    justify-content: center;
`

function Deposits() {
    let { id } = useParams();
    const [savings, setSavings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('')
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://purposetrustapi.herokuapp.com/api/savings/get/one/${id}`).then((res) => {
        console.log(res.data[0]['userId'])
        setSavings(res.data[0])
        setUserId(res.data[0]['userId'])
    }).catch((err) => {
        console.log(err)
    })
        
    }, [id])

    const data = [
        {"Date": savings['day']},
        {"Time": savings['time']},
        {"Operation": savings['status']},
        {'Status': 'Pending'},
        {"Amount": `₦ ${savings['amount']}`},
        {"ID": savings['_id']}, 
    ];

    const approve = () => {
        setLoading(true)
        const data = {status: "completed"}
        axios.patch(`https://purposetrustapi.herokuapp.com/api/savings/update/status/${id}`,data).then((res) => {
            console.log(res)
            updateBalance()
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const decline = () => {
        setLoading(true)
        const data = {status: "cancelled"}
        axios.patch(`https://purposetrustapi.herokuapp.com/api/savings/update/status/${id}`,data).then((res) => {
            console.log(res)
            navigate(-1);
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

    const updateBalance = () => {
        setLoading(true)
        const data = {
            amount: savings['amount'],
            operation: savings['status']
        }
        axios.patch(`https://purposetrustapi.herokuapp.com/api/user/update/balance/${userId}`,data).then((res) => {
            console.log(res)
            setLoading(false)
            navigate(-1);
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }

  return (
    <Container>
        <Header> Pending Deposits </Header>
        {/* <p style={{ paddingTop: '10vh', textAlign: 'center', fontSize: '2rem', fontWeight: 'bolder', color: 'green'}}>Amount: N43,000</p>  */}
        <Div>
            {/* <Para>Date: 03/07/2022 </Para>
            <Para>Time: 07:53 </Para>
            <Para>Agent: John Ray </Para>
            <Para>ID: 5645527452 </Para>
            <Para>Card Number: 346896 </Para> */}
            {
                data.map((obj) => Object.entries(obj).map((e, i) => <Para key={i}> {e[0]}: {e[1]}</Para>))
                
            }
        </Div>
        <Div2>
            <p onClick={() => approve()} style={{background: 'green', cursor: 'pointer', padding: '1em 3em', margin: '1em 1em', color: 'white'}}>Approve</p>
            <p onClick={() => decline()} style={{background: 'red', cursor: 'pointer', padding: '1em 3em', margin: '1em 1em', color: 'white'}}>Decline</p>
        </Div2>
            <SpinnerCircular enabled={loading} />
    </Container>
  )
}

export default Deposits