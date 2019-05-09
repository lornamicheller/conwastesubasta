// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import RegionForm from './components/regionForm';
import * as loadingActions from '../../../../actions/loadingActions';
import Layout from '../../../../components/layout';
import { createRegion } from '../../../../api/regions';

type Props = {
  // redux boolean
  loading: boolean,
  // redux action
  setLoading: (boolean) => any,
  // redux form
  form: Object,
  // redux object
  currentUser: Object
}
class New extends Component {
  props: Props;
  constructor() {
    super();

    (this: any).submit = this.submit.bind(this);
  }
  async submit() {
    const { setLoading, form, currentUser }: Props = this.props;
    const { regionForm: { values } }: Object = form;
    setLoading(true);
    try {
      await createRegion(values.regionName, currentUser.subscriberid);
      toastr['success']('Región creada');
      return Router.push('/dashboard/admin');
    } catch (err) {
      console.error('Error: ', err);
      if (err.response) toastr['error']('Hubo un error: ' + err.response.message);
    }
    setLoading(false);
  }
  render() {
    return (
      <Layout title="Crear Región">
        <div className="container">
          <div className="row" style={{marginTop: 25}}>
            <div className="col-12 col-sm-4 offset-sm-4">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">
                    Crear región
                  </h4>
                  <RegionForm onSubmit={this.submit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state: Object): Object {
  return {
    loading: state.loading,
    form: state.form,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(loadingActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
