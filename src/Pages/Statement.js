import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { SpinnerCircular } from 'spinners-react';


const Container = styled.div`
    background: #f5f5f5;
    margin: 2em auto;
    width: 60%;
`
const Header = styled.h2`
    text-align: center;
    padding: 1em 0;
`
const Div = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 2em;
    border-bottom: 1px solid #000;
    color: ${props => props.operation === 'withdraw' ? 'red' : 'green'} 
`
const Body = styled.div``
const Text = styled.p`
    text-transform: capitalize;
    font-weight: bold;
`

const SpinnerContainer = styled.div`
    position: relative;
    padding-top: 10vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`




function Statement() {
    const [customer, setCustomer] = useState({})
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        setLoading(true)
        axios.get(`https://precious-pajamas-deer.cyclic.app/api/user/get/one/${id}`).then((res) => {
        console.log(res.data)
        setCustomer(res.data[0])
        setLoading(false)
        
    }).catch((err) => {
        console.log(err)
    })
        
    }, [id])

    useEffect(() => {  
        setLoading(true) 
        axios.get('https://precious-pajamas-deer.cyclic.app/api/savings/get/all').then((res) => {
        // console.log(res.data['results'])
        setHistory(res.data['results'].filter(saving => (saving["userId"] === id && saving['status'] === 'completed')))
        
        setLoading(false)
    }).catch((err) => {
        console.log(err)
        setLoading(false)
    })
    }, [id])

    const print = () => window.print()

  return (
    loading ? <SpinnerContainer> <SpinnerCircular enabled={loading} /> </SpinnerContainer>: <Container>
        <Header>Purpose Trust Limited</Header>
        <Header> {`Account Statement for ${customer['firstName']} ${customer['lastName']}`} </Header>
        <h3 style={{ fontSize: '1.4rem', textAlign: 'center' }}>Balance:  ₦ {customer['balance']} </h3>
        <Body>
            {
                history.map((dep, index) => <Div operation={dep['operation']} key={index}>
                    <Text> ₦ {dep['amount']} </Text>
                    <Text> {dep['operation']} </Text>
                    <Text> {dep['day']} </Text>
                </Div>)
            }
        </Body>
        <Div>
            <p style={{color: 'black'}}>Print statement of account</p>
            <button onClick={() => print()} style={{ color: 'white', background: 'green', cursor: 'pointer', margin: '1em 0', padding: '.5em 2em', borderStyle: 'none'}}>Print</button>
        </Div>
    </Container>
  )
}

export default Statement