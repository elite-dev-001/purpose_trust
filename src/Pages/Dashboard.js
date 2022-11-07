import React from 'react'
import styled from 'styled-components'
import { Outlet, Link, useParams } from 'react-router-dom';

const Container = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    height: 100vh;
    position: relative;
    justify-content: flex-end;
`;
const Column = styled.div`
    background: #fee381;
    border-right: 4px solid #000;
    width: 30%;
    height: 100vh;
    position: fixed;
    left: 0;
    z-index: 1000;
`;
const Top = styled.div`
    background: #453c27;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2rem;
    font-weight: bold;
`;
const Para = styled.p`
    border-bottom: 2px solid #000;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6vh;
    // padding: 1em 0;
    color: #000;
    font-weight: bold;
    cursor: pointer;
`;
const Display = styled.div``;


function Dashboard() {
    let { id } = useParams();
  return (
    <Container>
        <div></div>
        <Column>
            <Top> Select </Top>
            <Link to= {`/dashboard/customers/${id}`} ><Para>Customers</Para></Link>
            <Link to="/dashboard/agents"><Para>Agents</Para></Link>
            <Link to={`/dashboard/reset/password/${id}`}><Para>Reset Password</Para></Link>
            <Link to="/dashboard/customer/commission"><Para>Commission</Para></Link>
            <Link to="/dashboard/customer/onloan"><Para>Active Loans</Para></Link>
            <Link to="/dashboard/customer/activeloan"><Para>Pending Loans</Para></Link>
        </Column>
        <Display><Outlet /></Display>
    </Container>
  )
}

export default Dashboard