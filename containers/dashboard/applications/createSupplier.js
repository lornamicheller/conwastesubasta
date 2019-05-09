import React, { Component } from "react";
import Router from "next/router";
import Layout from "../../../components/layout";
import CreateUserForm from "../../../components/createUserForm";
class CreateSupplier extends Component {
  constructor() {
    super();

    this.redirectAction = this.redirectAction.bind(this);
  }

  redirectAction() {
    Router.push("/dashboard/applications");
  }
  render() {
    return (
      <Layout title="Crear suplidor">
        <div className="container">
          <div
            className="row containerFlexCol flexCenter alignCenter"
            style={{ marginTop: 45 }}
          >
            <div className="col-sm-4 col-12">
              <CreateUserForm
                supplierForm={true}
                redirectAction={this.redirectAction}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default CreateSupplier;
