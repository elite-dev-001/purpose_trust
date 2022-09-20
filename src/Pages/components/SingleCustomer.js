import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';
import styled from 'styled-components';


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

const Profile = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 12vh;
`
const Img = styled.img`
    height: 150px;
    width: 150px;
    border-radius: 100%;
`
const Div = styled.div`
    padding: 2em;
`
const Para = styled.p`
    background: #ddd;
    padding: 1em;
    font-weight: bold
`
const Balance = styled.p`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: darkgreen;
    border: 5px solid darkgreen;
    padding: 1em 0;
    margin: 1em;
`;

const Deposits = styled.div`
    background: #fee381;
    margin: 2em;
`
const Head = styled.p`
    background: #453c27;
    color: white;
    margin: 0;
    padding: 1em;
`
const Body = styled.div`
    background: #fee381;
    margin: 0;
`
const Div2 = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0em 2em;
    border-bottom: 2px solid #000;
    font-weight: bold;
    cursor: pointer;
    text-transform: capitalize
`
const SpinnerContainer = styled.div`
    position: relative;
    padding-top: 10vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

function SingleCustomer() {
    const [customer, setCustomer] = useState({})
    const [deposit, setDeposit] = useState([])
    const [withdrawal, setWithdrawal] = useState([])
    const [completed, setCompleted] = useState([])
    const [loading, setLoading] = useState(false);
    const [akawoLoading, setAkawoLoading] = useState(false);
    const [akawo, setAkawo] = useState(false)
    const [businessLoading, setBusinessLoading] = useState(false);
    const [business, setBusiness] = useState(false)
    let { id } = useParams();
    let navigate = useNavigate();


    useEffect(() => {  
        setLoading(true) 
        axios.get('https://purposetrustapi.herokuapp.com/api/savings/get/all').then((res) => {
        // console.log(res.data['results'])
        setDeposit(res.data['results'].filter(saving => (saving["userId"] === id && saving['status'] === 'deposit')))

        setWithdrawal(res.data['results'].filter(saving => (saving["userId"] === id && saving['status'] === 'withdraw')))

        setCompleted(res.data['results'].filter(saving => (saving["userId"] === id && saving['status'] === 'completed')))
        setLoading(false)
    }).catch((err) => {
        console.log(err)
        setLoading(false)
    })
    }, [id])

    useEffect(() => {
        setLoading(true)
        axios.get(`https://purposetrustapi.herokuapp.com/api/user/get/one/${id}`).then((res) => {
        console.log(res.data)
        setCustomer(res.data[0])
        setAkawo(res.data[0]['akawoEligible'])
        setBusiness(res.data[0]['businessEligible'])
    }).catch((err) => {
        console.log(err)
    })
        
    }, [id])


    const toggleAkawo = () => {
        const data = {loanStatus: !akawo}
        setAkawoLoading(true)
        axios.patch(`https://purposetrustapi.herokuapp.com/api/user/update/akawo/loan/${id}`, data).then((res) => {
            console.log(res)
            setAkawo(!akawo)
            setAkawoLoading(false)
        }).catch((err) => {
            console.log(err)
            setAkawoLoading(false)
        })
    }
    const toggleBusiness = () => {
        const data = {loanStatus: !business}
        setBusinessLoading(true)
        axios.patch(`https://purposetrustapi.herokuapp.com/api/user/update/business/loan/${id}`, data).then((res) => {
            console.log(res)
            setBusiness(!business)
            setBusinessLoading(false)
        }).catch((err) => {
            console.log(err)
            setBusinessLoading(false)
        })
    }

    
  return (
    loading ? <SpinnerContainer> <SpinnerCircular enabled={loading} /> </SpinnerContainer>: <Container>
        <Header> { `${customer["firstName"]} ${customer['lastName']}` }  </Header> 
        <Profile>
            <Img width='200px' src={ customer['picture'] } alt='profile pic' />
        </Profile>
        <Balance> Balance: ₦ {customer['balance']} </Balance>
        <Div>
            <Para>First Name: {customer['firstName']} </Para>
            <Para>Last Name: {customer['lastName']} </Para>
            <Para>Phone Number: {customer['phoneNumber']} </Para>
            <Para>Gender: {customer['gender']} </Para>
            <Para>State of Residence: {customer['stateOfResidence']} </Para>
            <Para>Address: {customer['address']} </Para>
            <Para>Card Number: {customer['cardNumber']} </Para>
            <Para>Principal Amount: {customer['principalAmount']} </Para>
            <Para>Paid for Card: {String(customer['cardPayment'])}</Para>
        </Div>
        <div style={{margin: '2em', display: 'flex', alignItems: 'center'}}>
            <p style={{fontSize: '1.5em', fontWeight: 'bold'}}>Eligible for Akawo Loan?</p>
            <div style={{margin: '0 2em', background: `${akawo ? 'green':'red'}`, borderRadius: '2em', color:'white', padding: '.8em 5em'}}> {akawoLoading ? <SpinnerCircular color='#fff' secondaryColor={'#000'} size={25} enabled={akawoLoading}></SpinnerCircular> : akawo ? 'Yes' : 'No'}</div>
            <button onClick={() => toggleAkawo()} style={{margin: '0 2em', borderStyle: 'none', background: `${akawo ? 'red':'green'}`, color:'white', padding: '1em 2em', cursor: 'pointer'}}>{ akawoLoading ? <SpinnerCircular color='#fff' secondaryColor={'#000'} size={25} enabled={akawoLoading}></SpinnerCircular> : akawo ? 'Remove Eligibility' : 'Make Eligible'}</button>
        </div>
        <hr/>
        <div style={{margin: '2em', display: 'flex', alignItems: 'center'}}>
            <p style={{fontSize: '1.5em', fontWeight: 'bold'}}>Eligible for Business Loan?</p>
            <div style={{margin: '0 2em', background: `${business ? 'green':'red'}`, borderRadius: '2em', color:'white', padding: '.8em 5em'}}> {businessLoading ? <SpinnerCircular color='#fff' secondaryColor={'#000'} size={25} enabled={businessLoading}></SpinnerCircular> : business ? 'Yes' : 'No'}</div>
            <button onClick={() => toggleBusiness()} style={{margin: '0 2em', borderStyle: 'none', background: `${business ? 'red':'green'}`, color:'white', padding: '1em 2em', cursor: 'pointer'}}>{ businessLoading ? <SpinnerCircular color='#fff' secondaryColor={'#000'} size={25} enabled={businessLoading}></SpinnerCircular> : business ? 'Remove Eligibility' : 'Make Eligible'}</button>
        </div>
        <Deposits>
            <Head> Pending Deposits </Head>
            <Body>
                {
                    deposit.length === 0 ? <p style={{textAlign: 'center', padding: '1em', fontWeight: 'bold' }}> No Current Deposits</p> : deposit.map((dep, index) => <Div2 key={index} onClick={() => navigate(`deposits/${dep['_id']}`)} >
                        <p> ₦ {dep['amount']} </p>
                        <p> {dep['day']} </p>
                    </Div2>)
                }
            </Body>
        </Deposits>
        <Deposits>
            <Head> Pending Withdrawls </Head>
            <Body>
                {
                    withdrawal.length === 0 ? <p style={{textAlign: 'center', padding: '1em', fontWeight: 'bold' }}> No Current Withdrawal Request</p> : withdrawal.map((dep, index) => <Div2 key={index} onClick={() => navigate(`withdraws/${dep['_id']}`)} >
                        <p> ₦ {dep['amount']} </p>
                        <p> {dep['day']} </p>
                    </Div2>)
                }
            </Body>
        </Deposits>
        <Deposits>
            <Head> Completed Transactions </Head>
            <Body>
                {
                    completed.length === 0 ? <p style={{textAlign: 'center', padding: '1em', fontWeight: 'bold' }}> No Completed Transactions</p> : completed.map((dep, index) => <Div2 key={index} onClick={() => navigate(`/customer/statement/${id}`)} >
                        <p> ₦ {dep['amount']} </p>
                        <p> {dep['operation']} </p>
                        <p> {dep['day']} </p>
                    </Div2>)
                }
            </Body>
        </Deposits>
    </Container>
  )
}

export default SingleCustomer