import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SpinnerCircular } from 'spinners-react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';



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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-top: 12vh;
`;
const Input = styled.input`
    border-style: none;
    padding: .7em 1em;
    width: 90%;
    border: 1px solid gold;
    border-radius: 1em;
    margin: .5em 0;
    font-size: 1rem
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

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

function ChangePassword() {

  const [error, setError] = useState('');
  const [token, setToken] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false);
  let { id } = useParams();


  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    if(data['password'].length < 6 || data['confirmPassword'].length < 6) {
      setError('Password must be greater than six digits')
    }else if(data['password'] !== data['confirmPassword']) {
      setError('Password Does Not Match')
    } else {
      setError('')
      setLoading('true')
      const newData = {
        newPassword: data['password'],
        token: token,
        user: 'admin'
      };

      axios({
      method: 'post',
      url: `https://purposetrustapi.herokuapp.com/api/reset/password/${id}`,
      data: newData
    }).then((res) => {
      console.log(res.data)
      setLoading(false);
      setSuccess('Password Updated Successfully');
      // navigate('dashboard/customers')
    }).catch((err) => {
      console.log(err)
      setError('Could not update, something went wrong')
      setLoading(false)
    })
    
    }

    
  };

  return (
   <Container>
     <Header>Reset Your Password</Header>
     <InputSection>
      <p>Input Your New Password</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Input type='password' {...register('password', { required: true })} placeholder="Password" />
        {errors.lastName && <p>Password is required.</p>}
      <Input type="password" {...register('confirmPassword', { required: true })} placeholder="Confirm Password" />
        {errors.age && <p>Password is required.</p>}
         {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><SpinnerCircular enabled={loading} /></div> : <Submit type="submit" />}
    </Form>
      <p style={{color: 'red', fontSize: '1rem'}}> {error} </p>
      <p style={{color: 'green', fontSize: '1rem'}}> {success} </p>
     </InputSection>
   </Container>
  )
}

export default ChangePassword