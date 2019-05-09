// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";
import Layout from "../../components/layout";
type Props = {
  // redux array
  requestsList: Array<Object>,
  // redux object
  currentUser: Object
};
type State = {
  requests: Array<Object>,
  requests2: Array<Object>
};
class Index extends Component {
  props: Props;
  state: State;

  constructor() {
    super();

    this.state = {
      requests: [],
      requests2: []
    };

    (this: any).showRequests = this.showRequests.bind(this);
    (this: any).showRequests2 = this.showRequests2.bind(this);
  }
  componentWillMount() {
    const { requestsList } = this.props;
    const requests: Array<Object> = [];
    const requests2: Array<Object> = [];
    const request: Object = {};
    const request2: Object = {};
    // pendint
    request.pendientes = 0;
    // accepted
    request.aceptadas = 0;
    request2.pendientes = 0;
    // declined
    request.rechazadas = 0;
    // completed
    request.completadas = 0;
    request2.completadas = 0;
    // winners
    request.ganador_seleccionado = 0;
    request2.ganador_seleccionado = 0;
    requestsList.forEach(req => {
      if (req.statusid === 1) request.pendientes++;
      if (req.statusid === 2) request.aceptadas++;
      if (req.statusid === 2) request2.pendientes++;
      if (req.statusid === 3) request.rechazadas++;
      if (req.statusid === 4) request.completadas++;
      if (req.statusid === 4) request2.completadas++;
      if (req.statusid === 5) request.ganador_seleccionado++;
      if (req.statusid === 5) request2.ganador_seleccionado++;
    });
    requests.push(request);
    requests2.push(request2);
    this.setState({ requests, requests2 });
  }
  showRequests() {
    const { currentUser } = this.props;
    return currentUser.roleid === 1 || currentUser.roleid === 5;
  }
  showRequests2() {
    const { currentUser } = this.props;
    return currentUser.roleid === 2 || currentUser.roleid === 5;
  }
  render() {
    const { currentUser } = this.props;
    const { requests, requests2 } = this.state;
    return (
      <Layout title="Dashboard">
        <div className="container">
          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-12">
              <h1>Dashboard</h1>
            </div>
          </div>
          {
            currentUser.roleid === 5 || currentUser.roleid === 6 ?
            <div className="row">
              <div className="col-12">
                <Link href="/dashboard/reports/subastas">
                  <a className="btn btn-primary waves-effect">
                    Ver subastas completadas
                  </a>
                </Link>
              </div>
            </div>
            :
            null
          }
          <div className="row">
            {this.showRequests() &&
              <div className="col-12 col-sm-6">
                <h3>Requisiciones:</h3>
                <ResponsiveContainer height={400} width="100%">
                  <BarChart
                    data={requests}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pendientes" fill="#e2cb4c" />
                    <Bar dataKey="aceptadas" fill="#8884d8" />
                    <Bar dataKey="rechazadas" fill="#82ca9d" />
                    <Bar dataKey="completadas" fill="#f2ca9d" />
                    <Bar dataKey="ganador_seleccionado" fill="#b2ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>}
            {this.showRequests2() &&
              <div className="col-12 col-sm-6">
                <h3>Subastas:</h3>
                <ResponsiveContainer height={400} width="100%">
                  <BarChart
                    data={requests2}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pendientes" fill="#e2cb4c" />
                    <Bar dataKey="completadas" fill="#f2ca9d" />
                    <Bar dataKey="ganador_seleccionado" fill="#b2ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>}
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestsList: state.requestsList,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Index);
