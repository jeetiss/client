import React from 'react'
import { connect } from 'react-redux'
import { selectUser } from '../selectors'
import { Route, Redirect } from 'react-router-dom'

const PrivateRouteView = ({ user, component, ...rest }) => (
  <Route {...rest} render={props =>
    user.isAuthenticated
    ? React.createElement(component, props)
    : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }} />
  } />
)

const PrivateRoute = connect(selectUser)(PrivateRouteView)
export default PrivateRoute
