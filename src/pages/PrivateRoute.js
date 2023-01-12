//This component priveates  
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, path, exact}) => {
  console.log(exact)
  const {isAuthenticated, user} = useAuth0();
  const isUser = isAuthenticated && user;
  // if user is not authenticated - redirect to login page, if it is, then render chldren 
  return isUser ? <Route path={path} exact={exact}>{children}</Route> : <Redirect to='/login'/>;
};
export default PrivateRoute;
