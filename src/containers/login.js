import React from 'react'
import LoginForm from '../components/loginform'
import { connect } from 'react-redux'
import { selectUser } from '../selectors'
import { Redirect } from 'react-router-dom'

function LoginView ({ dispatch, user }) {
  if (user.isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />
  } else {
    return <LoginForm
      onSub={(name, pass) => dispatch(
        { type: 'ws/auth', name, pass }
      )}
    />
  }
}

const Login = connect(selectUser)(LoginView)
export default Login
