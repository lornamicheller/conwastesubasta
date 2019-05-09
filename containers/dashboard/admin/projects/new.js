// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import Layout from '!/components/layout';
import ProjectForm from './components/projectForm';
import * as regionsActions from '!/actions/regionsActions';
import * as loadingActions from '!/actions/loadingActions';
import { createProject } from '!/api/projects';

type Props = {
  // redux form
  form: Object,
  // redux action
  getAsyncRegionsAction: (subscriberId: number) => any,
  // redux action
  setLoading: (boolean) => any,
  // redux boolean
  loading: boolean,
  // redux object
  currentUser: Object
}
class New extends Component {
  props: Props;
  constructor(props) {
    super(props);

    (this: any).submit = this.submit.bind(this);
  }
  async componentDidMount(): any {
    const { getAsyncRegionsAction, setLoading, currentUser } = this.props;
    setLoading(true);
    await getAsyncRegionsAction(currentUser.subscriberid);
    setLoading(false);
  }
  async submit() {
    const { form: { projectForm }, setLoading } = this.props;
    setLoading(true);
    try {
      await createProject(projectForm.values.projectName, projectForm.values.region);
      toastr['success']('Proyecto creado.');
      return Router.push('/dashboard/admin');
    } catch (err) {
      console.error('Error: ', err);
      console.error('Error: ', err.response.data);
      toastr['error']('Error, intente de nuevo o contacte a soporte.');
    }
    setLoading(false);
  }
  render() {
    return (
      <Layout title="Crear Proyecto">
        <div className="container">
          <div className="row" style={{marginTop: 25}}>
            <div className="col-12 col-sm-4 offset-sm-4">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">
                    Crear Projecto
                  </h4>
                  <ProjectForm onSubmit={this.submit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function mapStateToProps(state): Object {
  return {
    form: state.form,
    currentUser: state.currentUser,
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch: Dispatch): any {
  return bindActionCreators({
    ...regionsActions,
    ...loadingActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(New);
