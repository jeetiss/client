import React from 'react'
import LoginForm from '../components/loginform'
import { connect } from 'react-redux'

function LoginView ({ dispatch }) {
  return <LoginForm
    onSub={(name, pass) => dispatch(
      { type: 'ws/auth', name, pass }
    )}
  />
}

const Login = connect()(LoginView)
export default Login
