import React, { Component } from "react";
import Router from "next/router";
import CreateUserForm from "../../../../components/createUserForm";
import Layout from "../../../../components/layout";
class New extends Component {
  static redirectAction() {
    Router.push("/dashboard/admin");
  }
  render() {
    return (
      <Layout title="Crear Usuario">
        <div className="container">
          <div className="row" style={{ marginTop: 45 }}>
            <div className="col-12 col-sm-4 offset-sm-4">
              <CreateUserForm
                redirectAction={New.redirectAction}
                supplierForm={false}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default New;
