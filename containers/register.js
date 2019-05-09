// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import Head from 'next/head';
import RegisterForm from '!/components/registerForm';
import * as subscribersActions from '!/actions/subscribersActions';
import { createUser } from '!/api/users';

type Props = {
  // redux action
  fetchSubscribersAction: () => any,
  // redux form
  form: Object
}
class Register extends Component {
  props: Props;
  constructor() {
    super();

    (this: any).register = this.register.bind(this);
  }
  async componentDidMount(): any {
    const { fetchSubscribersAction } = this.props;
    await fetchSubscribersAction();
  }
  async register(): any {
    const {
      form: { registerForm: { values } }
    } = this.props;
    try {
      await createUser(
        values.name,
        values.lastname,
        values.email,
        null,
        values.companyname,
        values.companyphone,
        values.contactname,
        4,
        null,
        values.subscriberId
      );
      toastr['success']('Registrado correctamente.');
      toastr['info']('Se ha enviado un email con su password provisional.', '', {timeOut: 10000});
      Router.push('/');
    } catch (err) {
      console.error('Error creating user: ', err);
      console.error(err.response.data);
      toastr['error']('Hubo un error, intente más tarde o contacte a soporte.', err.response.data.message);
    }
  }
  render() {
    return (
      <div
        style={{ minHeight: "100vh" }}
        className="container-fluid containerFlexRow alignCenter flexCenter"
      >
        <Head>
          <title>Conwaste Subasta Register</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/theme.min.css" />
          <link rel="stylesheet" href="/static/css/global.css" />
        </Head>
        <div className="row containerFlexRow flexCenter alignCenter">
          <div className="col-sm-8">
            <div className="card">
              <div style={{ padding: 15 }}>
                <img
                  className="card-img-top"
                  src="/static/images/conwaste-logo.png"
                  alt="Card image cap"
                />
              </div>
              <div className="card-block">
                <h4 className="card-title">Regístrate</h4>
                <RegisterForm onSubmit={this.register} />
              </div>
            </div>
          </div>
        </div>
        <script type="text/javascript" src="/static/js/jquery-2.2.3.min.js" />
        <script type="text/javascript" src="/static/js/tether.min.js" />
        <script type="text/javascript" src="/static/js/bootstrap.min.js" />
        <script type="text/javascript" src="/static/js/theme.min.js" />
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    form: state.form
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(subscribersActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
