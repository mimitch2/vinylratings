import React, { useState, useContext } from 'react';
import { useMutation } from 'react-query'
import { useNavigate } from "react-router-dom";
import { UserContext } from 'App'
import { apiService } from 'services';
import './login.scss'

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: '',
    email: ''
  });
  const { setUser: serUserContext } = useContext(UserContext)


  const { mutateAsync, isLoaading } = useMutation(() =>
    apiService.request({
      route: 'users/login',
      method: 'POST',
      payload: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    }), {
    mutationKey: 'login',
    onSuccess: (data) => {
      serUserContext(data)
      navigate('/search')
    }
  }
  )

  const submit = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log("🚀 ~ file: Login.js ~ line 30 ~ submit ~ error", error)
    }
  }

  const onChange = (e) => {
    setUser((currentValues) => {
      return {
        ...currentValues,
        [e.target.name]: e.target.value
      };
    });
  }


  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      submit()
    }}>
      <label>User Name</label>
      <input type="text" name="userName" onChange={onChange} />
      <label>Password</label>
      <input type="password" name="password" onChange={onChange} />
      <label>email</label>
      <input type="email" name="email" onChange={onChange} />
      <button type="submit">GO!</button>
    </form>
  );
};

export default Login;
