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
const Btn = styled.button`
    padding: .8em 3em;
    border-style: none;
    font-weight: bold;
    cursor: pointer;
    background: #453c27;
    color: #fff;
`

const SpinnerContainer = styled.div`
    position: relative;
    padding-top: 10vh;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

function ListAgent() {
    
    let navigate = useNavigate();

    // function userDetails(id) {
    //     window.location.href = `customer/${id}`
    // }

    const newAgent = () => navigate(`/dashboard/new/agent`);
    const [search, setSearch] = useState('');
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
        axios.get('https://precious-pajamas-deer.cyclic.app/api/agent/get/all').then((res) => {
        // console.log(res.data['results'])
        setAgents(res.data['results'])
        setLoading(false)
    }).catch((err) => {
        console.log(err)
        setLoading(false)
    })
        
    }, [])

  return (
    <Container>
        <Header>ALL ACTIVE AGENTS <Input onChange={e => setSearch(e.target.value)} type='number' value={search} placeholder='Enter Agent Phone Number' /> <Btn onClick={() => newAgent()}>Add Agent</Btn> </Header>
        {
             loading ? <SpinnerContainer> <SpinnerCircular enabled={loading} /> </SpinnerContainer> : agents.length === 0 ? <h1>No Registered agents</h1> : agents.filter((val) => {
               if(search === '') {
                 return val;
               } else if(val['phoneNumber'].includes(search)){
                 return val;
               }
             }).map((agent) => <Wrap onClick={() => navigate(`/dashboard/agent/${agent["_id"]}`)} key={agent["_id"]}>
                <p>{agent["firstName"]} {agent["lastName"]} </p>
                <p> {agent["phoneNumber"]} </p>
                </Wrap>)
        }
    </Container>
  )
}

export default ListAgent