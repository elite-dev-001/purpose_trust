import React, { useState} from 'react'
import styled from 'styled-components'
import logo from './../images/logo.jpeg'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import axios from 'axios'
// import axios from 'axios';
// import currentAPI from './utility';
// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'


const Container = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100vh
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fee381;
`
const BackgroundImage = styled.div`
    background: #000;
    background-image: url(${logo});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    border-style: none;
    padding: 1em 2em;
    border: 1px solid gold;
    border-radius: 1em;
    margin: .5em 0
`
const Submit = styled.input`
    border-style: none;
    color: white;
    background: #c4973b;
    padding: .8em 2em;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    margin: 1em 0;
    cursor: pointer;
`


function Login() {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError('')
    setLoading('true')
    console.log(data);
    // navigate(`dashboard/customers/2341332527352483623`)

    axios({
      method: 'post',
      url: 'https://precious-pajamas-deer.cyclic.app/api/login',
      data: data
    }).then((res) => {
      console.log(res.data)
      setLoading(false);
      if(res.data['status'] === 'ok') {
        const token = res.data['data']
        localStorage.setItem('token', token);
        const data = JSON.parse(atob(token.slice(37, -44)))
        const id = data['id']
        navigate(`dashboard/customers/${id}`)
      } else {
        setLoading(false);
        setError(res.data['error'])
      }
      
    }).catch((err) => {
      setLoading(false);
      console.log(err)
    })
    // navigate('dashboard/customers')
  };

  

  return (
    <Container>
      <InputSection>
      <p>Log In to your Account</p>
      <p>For Admins Only</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('phoneNumber', { required: true })} placeholder="Phone Number" />
        {errors.lastName && <p>Phone Number is required.</p>}
        <Input type="password" {...register('password', { required: true })} placeholder="Password" />
        {errors.age && <p>Password is required.</p>}
        {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><SpinnerCircular enabled={loading} /></div> : <Submit type="submit" />}
    </Form>
      <p style={{color: 'red', fontSize: '1rem'}}> {error} </p>
      </InputSection>
      <BackgroundImage />
    </Container>
  );
}

export default Login;