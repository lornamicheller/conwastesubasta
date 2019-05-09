// @flow
/**
 * THIS IS THE LATEST IMPLEMENTATION OF AUTHENTICATION
 * IT WILL MAKE A REQUEST WITH YOUR sessionToken TO THE API AND RETURN THE OBJECT OF THE
 * USER IF SUCCESS OR WILL THROW ERROR IF IT DOESN'T EXIST.
 * IT WILL REDIRECT TO LOGIN BEFORE RENDERING THE VIEW IF USER IS NOT AUTHENTICATED
 * THIS FUNCTION SHOULD BE CALLED IN PAGE getInitialProps BUT IN THEORY, IT CAN BE USED ANYWHERE
 */

import axios from 'axios';
import cookie from 'react-cookie';
import * as authActions from "!/actions/authActions";
import Router from 'next/router';

export default async function authenticate (store: Object, isServer: boolean, req: Object, res: Object): Object {
  // http://localhost:3000/dashboard/admin/projects/new
  if (isServer) cookie.setRawCookie(req.headers.cookie);
  const sessionToken = cookie.load("sessionToken");
  if (sessionToken) {
    try {
      const userResponse: any = await axios.get(API_URL + '/v1/current-user/' + sessionToken);
      await store.dispatch(authActions.setCurrentUserAction(userResponse.data[0]));
      return userResponse.data[0];
    } catch (err) {
      console.error('Error authenticating: ', err);
      console.error(err.response.data);
      if (isServer) {
        return res.writeHead(301, {
          Location: '/'
        });
      } else {
        return Router.push('/');
      }
    }
  } else {
    if (isServer) {
      return res.writeHead(301, {
        Location: '/'
      });
    } else {
      return Router.push('/');
    }
  }
}