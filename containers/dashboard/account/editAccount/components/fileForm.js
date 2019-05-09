import React, { Component, PropTypes } from "react";
class FileForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    changeFile: PropTypes.func.isRequired,
    fileInputChange: PropTypes.func.isRequired,
    uploadingFile: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      companyname: PropTypes.string,
      companyphone: PropTypes.string,
      contactname: PropTypes.string,
      w9_url: PropTypes.string,
      merchant_registration_url: PropTypes.string,
      corporation_certificate_url: PropTypes.string
    }).isRequired
  };
  render() {
    const {
      loading,
      changeFile,
      fileInputChange,
      uploadingFile,
      user
    } = this.props;
    return (
      <div className="card-block">
        <h4 className="card-title">
          Archivos <br />
          {uploadingFile &&
            <span
              className="green-text containerFlexCol alignCenter flexCenter"
              style={{ fontSize: 14 }}
            >
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-green-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div><div className="gap-patch">
                    <div className="circle" />
                  </div><div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
              Subiendo archivo...
            </span>}
        </h4>
        <div className="row">
          <div className="col-12">
            <ul className="list-group">
              <li className="list-group-item">
                <span style={{ width: "100%" }}>
                  1. W9
                </span>
                <a
                  href={user.w9_url}
                  target="_blank"
                  disabled={loading}
                  className="btn btn-outline-default btn-sm waves-effect"
                >
                  <i className="fa fa-external-link" /> Ver
                </a>
                {" "}
                <button
                  disabled={loading}
                  onClick={() => changeFile(1)}
                  className="btn btn-outline-primary btn-sm waves-effect"
                >
                  <i className="fa fa-pencil" /> Cambiar
                </button>
              </li>
              <li className="list-group-item">
                <span style={{ width: "100%" }}>
                  2. Regístro de comerciante
                </span>
                <a
                  href={user.merchant_registration_url}
                  target="_blank"
                  disabled={loading}
                  className="btn btn-outline-default btn-sm waves-effect"
                >
                  <i className="fa fa-external-link" /> Ver
                </a>
                {" "}
                <button
                  disabled={loading}
                  onClick={() => changeFile(2)}
                  className="btn btn-outline-primary btn-sm waves-effect"
                >
                  <i className="fa fa-pencil" /> Cambiar
                </button>
              </li>
              <li className="list-group-item">
                <span style={{ width: "100%" }}>
                  3. Certificado de corporación
                </span>
                <a
                  href={user.corporation_certificate_url}
                  target="_blank"
                  disabled={loading}
                  className="btn btn-outline-default btn-sm waves-effect"
                >
                  <i className="fa fa-external-link" /> Ver
                </a>
                {" "}
                <button
                  disabled={loading}
                  onClick={() => changeFile(3)}
                  className="btn btn-outline-primary btn-sm waves-effect"
                >
                  <i className="fa fa-pencil" /> Cambiar
                </button>
              </li>

            </ul>
            <div className="file-field" style={{ display: "none" }}>
              <div className="btn btn-primary btn-sm waves-effect">
                <span>Choose file</span>
                <input
                  id="file1"
                  onChange={() => fileInputChange(1)}
                  type="file"
                />
              </div>
            </div>
            <div className="file-field" style={{ display: "none" }}>
              <div className="btn btn-primary btn-sm waves-effect">
                <span>Choose file</span>
                <input
                  id="file2"
                  onChange={() => fileInputChange(2)}
                  type="file"
                />
              </div>
            </div>
            <div className="file-field" style={{ display: "none" }}>
              <div className="btn btn-primary btn-sm waves-effect">
                <span>Choose file</span>
                <input
                  id="file3"
                  onChange={() => fileInputChange(3)}
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FileForm;
