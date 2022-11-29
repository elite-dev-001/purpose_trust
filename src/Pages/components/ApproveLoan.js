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

const SpinnerContainer = styled.div`
    position: relative;
    padding-top: 10vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

function ApproveLoan() {
    let { id } = useParams();
    console.log(id)
    const [loading, setLoading] = useState(false);
    const [approveLoading, setApproveLoading] = useState(false);
    const [declineLoading, setDeclineLoading] = useState(false);
    const [customer, setCustomer] = useState({})
    const [loanDetails, setLoanDetails] = useState({})
    let navigate = useNavigate();


    useEffect(() => {
        setLoading(true)
        axios.get(`https://precious-pajamas-deer.cyclic.app/api/user/get/one/${id}`).then((res) => {
        console.log(res.data)
        setLoading(false)
        setCustomer(res.data[0])
        const allLoans = res.data[0]['loanDetails']
        console.log(allLoans)
        setLoanDetails(allLoans[allLoans.length - 1])
    }).catch((err) => {
        console.log(err)
        setLoading(false)
    })
        
    }, [id])

    const data = [
        {"FullName": `${customer['firstName']} ${customer['lastName']}`},
        {"Phone Number": customer['phoneNumber']},
        {"Loan Type": loanDetails['loanType']},
        {"Card Number": `${customer['cardNumber']}`},
        {"Loan Amount": `₦ ${loanDetails['loanAmount']}`},
        {"Loan Application Date": loanDetails['loanDate']}, 
    ];

    const approve = () => {
        setApproveLoading(true)
        const data = {loanAmount: loanDetails['loanAmount']}
        axios.patch(`https://precious-pajamas-deer.cyclic.app/api/user/approve/loan/${id}`,data).then((res) => {
            console.log(res)
            navigate(-1);
        }).catch((err) => {
            console.log(err)
            setApproveLoading(false)
        })
    }

    const decline = () => {
        setDeclineLoading(true)
        const data = {pendingLoan: false}
        axios.patch(`https://precious-pajamas-deer.cyclic.app/api/user/decline/loan/${id}`,data).then((res) => {
            console.log(res)
            navigate(-1);
        }).catch((err) => {
            console.log(err)
            setDeclineLoading(false)
        })
    }


  return (
   loading ? <SpinnerContainer>
    <SpinnerCircular enabled={true} />
   </SpinnerContainer> : <Container>
        <Header> Pending Loan Request </Header>
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
            <p onClick={() => approve()} style={{background: 'green', cursor: 'pointer', padding: '1em 3em', margin: '1em 1em', color: 'white'}}>{ approveLoading ? <SpinnerCircular enabled={true} size={20} /> : 'Approve'}</p>
            <p onClick={() => decline()} style={{background: 'red', cursor: 'pointer', padding: '1em 3em', margin: '1em 1em', color: 'white'}}>{ declineLoading ? <SpinnerCircular enabled={true} size={20} /> : 'Decline'}</p>
        </Div2>
            {/* <SpinnerCircular enabled={loading} /> */}
    </Container>
  )
}

export default ApproveLoan