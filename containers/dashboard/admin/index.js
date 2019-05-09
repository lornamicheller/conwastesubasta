import React, { Component } from "react";
import Link from "next/link";
import Layout from "../../../components/layout";
class Index extends Component {
  render() {
    return (
      <Layout title="Administrator">
        <div className="container">
          <div className="row">
            <div className="col-12" style={{ marginTop: 25 }}>
              <h1>Area administrativa</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-sm-4">
                  <Link href="/dashboard/admin/users/new">
                    <a className="btn btn-primary waves-effect btn-block">
                      Crear Usuario
                    </a>
                  </Link>
                </div>
                <div className="col-sm-4">
                  <Link href="/dashboard/admin/regions/new">
                    <a className="btn btn-primary waves-effect btn-block">
                      Crear Región
                    </a>
                  </Link>
                </div>
                <div className="col-sm-4">
                  <Link href="/dashboard/admin/projects/new">
                    <a className="btn btn-primary waves-effect btn-block">
                      Crear Proyecto
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Index;
