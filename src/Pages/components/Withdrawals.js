import React, { useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'
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


function Withdrawals() {
    let { id , userId} = useParams();
    console.log(id)
    const [savings, setSavings] = useState({});
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({})
    let navigate = useNavigate();




    useEffect(() => {
        setLoading(true)
        axios.get(`https://purposetrustapi.herokuapp.com/api/user/get/one/${userId}`).then((res) => {
        console.log(res.data)
        setCustomer(res.data[0])
    }).catch((err) => {
        console.log(err)
    })
        
    }, [id])

    useEffect(() => {
        axios.get(`https://purposetrustapi.herokuapp.com/api/savings/get/one/${id}`).then((res) => {
        console.log(res.data[0])
        setSavings(res.data[0])
    }).catch((err) => {
        console.log(err)
    })
        
    }, [id])

    const data = [
        {"Date": savings['day']},
        {"Time": savings['time']},
        {"Operation": savings['status']},
        {"Amount": `₦ ${savings['amount']}`},
        {"ID": savings['_id']}, 
    ];

    const createCommission = () => {
        const data = {
            'amount': customer['principalAmount'],
            'customerId': customer['_id'],
            'customerName':
                `${customer['firstName']} ${customer['lastName']}`,
            'cardNumber': customer['cardNumber']
          };
        axios.post('https://purposetrustapi.herokuapp.com/api/commission/create', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const approve = () => {
        setLoading(true)
        const data = {status: "completed"}
        axios.patch(`https://purposetrustapi.herokuapp.com/api/savings/update/status/${id}`,data).then((res) => {
            console.log(res)
            console.log(savings['commission'])
            if(savings['commission']){
                createCommission()
            }
            sendSMS(`Your withrawal request of ${savings['amount']} Naira has been processed successfully. Your current balance is ${parseFloat(customer['balance']) - parseFloat(savings['amount'])} Naira`, customer['phoneNumber'])
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
            sendSMS(`Your withrawal request of ${savings['amount']} Naira has been declined. Contact your agent for any complains. Your current balance is ${parseFloat(customer['balance'])} Naira`, customer['phoneNumber'])
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

    const sendSMS = (message, number) => {
        const data = {
            message: message,
            number: number
        };

        axios.post('https://africanspringsapi.herokuapp.com/api/post/send/trust/sms', data).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <Container>
        <Header> Pending Withdrawals </Header>
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

export default Withdrawals