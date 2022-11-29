import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useForm } from 'react-hook-form';
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

function CreateNewAgent() {
  const [myFile, setMyFile] = useState({})
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  let navigate = useNavigate();


  const uploadImage = (files) => {
    setMyFile(files[0])
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(myFile)
    if(!myFile) {
      setError('Please upload Agent\'s image')
    } else if(data['phoneNumber'].length !== 11) {
      setError('Invalid Phone Number')
    } else if(data['password'].length < 6) {
      setError('Password must be six digits and above')
    } else if(data['password'] !== data['confirmPassword']) {
      setError('Password does not match')
    } else {
      setLoading(true)
      setError('')
      const formData = new FormData()

      for (const key in data) {
        formData.append(key, data[key])
      }

      formData.append('picture', myFile)

      axios({
        method: 'post',
        url: 'https://precious-pajamas-deer.cyclic.app/api/agent/register',
        data: formData,
      }).then((res) => {
        if(res.data['status'] === 'ok'){
          navigate(-1)
        } else {
          setLoading(false)
          setError(res.data['error'])
        }
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
        setError('Something went wrong, could not create new Agent')
      })
    }
    
    
  };


  return (
    <Container>
      <Header>Create a New Agent</Header>
      <InputSection>
      <p>Fill in the Approriate Details of the Agent</p>
      <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <Input {...register('firstName', { required: true })} placeholder="Enter First Name" />
      <Input {...register('lastName', { required: true })} placeholder="Last Name" />
      <label style={{textAlign: 'center'}} htmlFor='gender'>Gender</label>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <div>
          <span>Male</span>
          <Input value='Male' {...register('gender', { required: true })} name="gender" type='radio'/>
        </div>
        <div>
          <span>Female</span>
          <Input value='Female' {...register('gender', { required: true })} name="gender" type='radio'/>
        </div>
      </div>
      <Input {...register('phoneNumber', { required: true })} placeholder="Phone Number" />
      <Input {...register('address', { required: true })} placeholder="Address" />
      <Input {...register('stateOfResidence', { required: true })} placeholder="State of Residence" />
      <Input type='file'  onChange = {(e) => {uploadImage(e.target.files)} } />
      <Input type='password' {...register('password', { required: true })} placeholder="Password" />
        {errors.lastName && <p>Phone Number is required.</p>}
      <Input type="password" {...register('confirmPassword', { required: true })} placeholder="Confirm Password" />
        {errors.age && <p>Password is required.</p>}
        {loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><SpinnerCircular enabled={loading} /></div> : <Submit type="submit" />}
    </Form>
    <p style={{color: 'red', fontSize: '1rem'}}> {error} </p>
      </InputSection>
    </Container>
  )
}

export default CreateNewAgent