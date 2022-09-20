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
const Head = styled.p`
    background: #453c27;
    color: white;
    margin: 0;
    padding: 1em;
`
const SpinnerContainer = styled.div`
    position: relative;
    padding-top: 10vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

function SingleAgent() {
    const [agent, setAgent] = useState({})
    const [myCustomers, setMyCustomers] = useState([])
    const [loading, setLoading] = useState(false);
    // const [completed, setCompleted] = useState([])
    let { id } = useParams();
    let navigate = useNavigate();



    useEffect(() => {
        setLoading(true)
        axios.get(`https://purposetrustapi.herokuapp.com/api/agent/get/one/${id}`).then((res) => {
        console.log(res.data)
        setAgent(res.data[0])
        setLoading(false)
    }).catch((err) => {
        console.log(err)
        setLoading(false)
    })
        
    }, [id])


    useEffect(() => {
        setLoading(true)
      axios.get('https://purposetrustapi.herokuapp.com/api/user/get/all').then((res) => {
      // console.log(res.data['results'])
      setMyCustomers(res.data['results'].filter(customer => customer["agentId"] === id))
      setLoading(false)
  }).catch((err) => {
      console.log(err)
      setLoading(false)
  })
      
  }, [id])

    
  return (
    loading ? <SpinnerContainer> <SpinnerCircular enabled={loading} /> </SpinnerContainer> : <Container>
        <Header> { `${agent["firstName"]} ${agent['lastName']}` }  </Header> 
        <Profile>
            <Img width='200px' src={ agent['picture'] } alt='profile pic' />
        </Profile>
        <Div>
            <Para>First Name: {agent['firstName']} </Para>
            <Para>Last Name: {agent['lastName']} </Para>
            <Para>Phone Number: {agent['phoneNumber']} </Para>
            <Para>Gender: {agent['gender']} </Para>
            <Para>State of Residence: {agent['stateOfResidence']} </Para>
            <Para>Address: {agent['address']} </Para>
            <Head>All My Customers</Head>
        {/* <Body> */}
          {
            myCustomers.length === 0 ? <h3>No Registered Customers</h3> : myCustomers.map((customer) => <Wrap onClick={() => navigate(`/dashboard/customer/${customer["_id"]}`)} key={customer["cardNumber"]}>
            <p>{customer["firstName"]} {customer["lastName"]} </p>
            <p> {customer["cardNumber"]} </p>
            </Wrap>)
          }
        {/* </Body> */}
        </Div>
    </Container>
  )
}

export default SingleAgent