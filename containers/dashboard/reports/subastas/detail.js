import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
import * as requestsActions from '../../../../actions/requestsActions';
import * as bidsActions from '../../../../actions/bidsActions';
import * as loadingActions from '../../../../actions/loadingActions';
import Layout from '../../../../components/layout';
type Props = {
  // redux action
  getAsyncSingleRequestAction: (requestId: number) => any,
  // redux object
  request: Object,
  // redux action
  fetchAsyncBidders: (requestId: number) => any,
  // redux array
  bidders: Array<Object>,
  // redux action
  setLoading: (boolean) => any
}
class Detail extends Component {
  props: Props;
  async componentDidMount(): any {
    const { getAsyncSingleRequestAction, fetchAsyncBidders, setLoading } = this.props;
    setLoading(true);
    await Promise.all([
      getAsyncSingleRequestAction(Router.query.id),
      fetchAsyncBidders(Router.query.id)
    ]);
    setLoading(false);
  }
  render() {
    const { bidders, request } = this.props;
    console.log(this.props);
    return (
      <Layout title="Detalle de subasta">
        <div className="container">
          <div className="row" style={{marginTop: 25}}>
            <div className="col-12">
              <h1>Detalle de subasta</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">
                    {request.articlename}
                  </h4>
                  <p className="card-text">
                    <strong>Creado:</strong>
                    {' '}
                    {moment(request.createdat).locale('es').format("MMMM D, YYYY, h:mm:ss a")}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>
                    {' '}
                    {request.status}
                  </p>
                  <p className="card-text">
                    <strong>Cantidad:</strong>
                    {' '}
                    {request.quantity}
                  </p>
                  <p className="card-text">
                    <strong>Región:</strong>
                    {' '}
                    {request.regionname}
                  </p>
                  <p className="card-text">
                    <strong>Creado por:</strong>
                    {' '}
                    {request.createdbyname} {request.createdbylastname} {`<${request.createdbyemail}>`}
                  </p>
                  <p className="card-text">
                    <strong>Supervisor:</strong>
                    {' '}
                    {request.supervisorname} {request.supervisorlastname} {`<${request.supervisoremail}>`}
                  </p>
                  <p className="card-text">
                    <strong>Work Order:</strong>
                    {' '}
                    {request.workorder}
                  </p>
                  <p className="card-text">
                    <strong>Nota:</strong>
                    {' '}
                    {request.note}
                  </p>
                  <p className="card-text">
                    <strong>Nota de rechazo:</strong>
                    {' '}
                    {request.decline_note}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">
                    Subastadores
                  </h4>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Ganador?</th>
                        <th>Seleccionado como ganador por</th>
                        <th>Email</th>
                        <th>Cantidad</th>
                        <th>Compañia</th>
                        <th>Teléfono de compañia</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        bidders.map((bidder, index) => (
                          <tr key={index}>
                            <th scope="row">{bidder.bidder_name} {bidder.bidder_last_name}</th>
                            <td>{bidder.accepted ? 'Si' : 'No'}</td>
                            <td>{bidder.acceptedbyname} {bidder.acceptedbylastname} {`<${bidder.acceptedbyemail}>`}</td>
                            <td>{bidder.bidder_email}</td>
                            <td>{bidder.bidamount}</td>
                            <td>{bidder.bidder_company}</td>
                            <td>{bidder.bidder_company_phone}</td>
                          </tr>
                        ))
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    request: state.request,
    bidders: state.bidders
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...requestsActions,
    ...bidsActions,
    ...loadingActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
