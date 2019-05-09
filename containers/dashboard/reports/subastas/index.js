// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "next/link";
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Input } from "react-materialize";
import Layout from "../../../../components/layout";
import * as requestsActions from "../../../../actions/requestsActions";
import * as loadingActions from "../../../../actions/loadingActions";
import * as usersActions from "../../../../actions/usersActions";
type Props = {
  // redux array
  requestsList: Array<Object>,
  // redux action
  getAsyncRequestsListAction: (
    subscriberId: number,
    regionId: ?number,
    statusId: ?number,
    supervisorId: ?number
  ) => any,
  // redux action
  getAsyncSupplierRequests: (supplierid: number) => any,
  // redux boolean
  loading: boolean,
  // redux action
  setLoading: (boolean) => any,
  // redux object
  currentUser: Object,
  // redux action
  getAsyncUsersAction: (
    subscriberId: number,
    regionId: ?number,
    roleId: ?number
  ) => any,
  // redux array
  users: Array<Object>
};
class Index extends Component {
  props: Props;
  constructor() {
    super();

    (this: any).filterRequestsBySupplier = this.filterRequestsBySupplier.bind(this);
  }
  async componentDidMount(): any {
    const {
      setLoading,
      getAsyncRequestsListAction,
      currentUser,
      getAsyncUsersAction
    } = this.props;
    setLoading(true);
    try {
      await Promise.all([
        getAsyncRequestsListAction(currentUser.subscriberid),
        getAsyncUsersAction(currentUser.subscriberid, null, 3)
      ]);
    } catch (err) {
      console.error("Error: ", err);
    }
    setLoading(false);
  }
  static buttonAction(cell: number, row: Object, enumObject, index): Object {
    return (
      <Link href={`/dashboard/reports/subastas/detail?id=${row.requestid || cell}`}>
        <a
          className="btn btn-outline-primary btn-sm waves-effect"
        >
          Ver Detalles
        </a>
      </Link>
    )
  }
  static formatDate(cell: Date): string {
    return (
      moment(cell).locale('es').format("MMMM D, YYYY, h:mm:ss a")
    )
  }
  async filterRequestsBySupplier(event) {
    const { getAsyncSupplierRequests, setLoading } = this.props;
    setLoading(true);
    await getAsyncSupplierRequests(event.target.value);
    setLoading(false);
  }
  render() {
    const { requestsList, users } = this.props;
    return (
      <Layout title="Subastas Completadas">
        <div className="container">
          <div className="row" style={{ marginTop: 25 }}>
            <div className="col-12">
              <h1>Subastas</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{marginBottom: 15}}>
              <span>Filtrar:</span>
            </div>
            <div className="col-sm-4">
              <div className="row">
                <Input
                  s={12}
                  onChange={this.filterRequestsBySupplier}
                  type="select"
                  label="Seleccione un suplidor"
                  defaultValue=""
                >
                  <option value="" disabled>Seleccione una opción</option>
                  {
                    users.map((user, index) => (
                      <option key={index} value={user.id}>{user.name} {user.lastname}</option>
                    ))
                  }
                </Input>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <BootstrapTable
                data={requestsList}
                hover={true}
              >
                <TableHeaderColumn
                  width={'220'}
                  dataField="articlename"
                  isKey={true}
                  dataAlign="center"
                  dataSort={true}
                >
                  Nombre de artículo
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={'150'}
                  dataField="status"
                  dataAlign="center"
                  dataSort={true}
                >
                  Status
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={'220'}
                  dataField="createdat"
                  dataFormat={ Index.formatDate }
                  dataSort={true}
                >
                  Creado
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={'220'}
                  dataField="regionname"
                  dataSort={true}
                  filter={{
                    type: 'TextFilter',
                    delay: 1000,
                    placeholder: 'Nombre de región'
                  }}
                >
                  Región
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={'220'}
                  dataField="projectname"
                  dataSort={true}
                  filter={{
                    type: 'TextFilter',
                    delay: 1000,
                    placeholder: 'Nombre de proyecto'
                  }}                >
                  Proyecto
                </TableHeaderColumn>
                <TableHeaderColumn
                  width={'180'}
                  dataField='id'
                  dataFormat={ Index.buttonAction }
                  dataAlign="center"
                >
                  Acciones
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    requestsList: state.requestsList,
    loading: state.loading,
    currentUser: state.currentUser,
    users: state.users
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      ...requestsActions,
      ...loadingActions,
      ...usersActions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
