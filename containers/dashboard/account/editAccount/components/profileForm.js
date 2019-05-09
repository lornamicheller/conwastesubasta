import React, { Component, PropTypes } from "react";
class ProfileForm extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      companyname: PropTypes.string,
      companyphone: PropTypes.string,
      contactname: PropTypes.string
    }).isRequired,
    saveProfile: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    disable: PropTypes.bool.isRequired
  };
  render() {
    const {
      user,
      saveProfile,
      loading,
      handleInputChange,
      disable
    } = this.props;
    return (
      <div className="card-block">
        <h4 className="card-title">Perfil</h4>
        <form onSubmit={saveProfile}>
          <div className="row">
            <div className="col-6">
              <div className="md-form">
                <i className="fa fa-user prefix" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label
                  htmlFor="name"
                  className={`${user.name ? "active" : ""}`}
                >
                  Nombre
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="md-form">
                <i className="fa fa-user prefix" />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label
                  htmlFor="lastname"
                  className={`${user.lastname ? "active" : ""}`}
                >
                  Apellido
                </label>
              </div>
            </div>
            <div className="col-12">
              <div className="md-form">
                <i className="fa fa-envelope prefix" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label
                  htmlFor="email"
                  className={`${user.email ? "active" : ""}`}
                >
                  Correo Electrónico
                </label>
              </div>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12">
              <h4 className="card-title">Compañia</h4>
            </div>
            <div className="col-12">
              <div className="md-form">
                <i className="fa fa-building prefix" />
                <input
                  type="text"
                  id="companyname"
                  name="companyname"
                  value={user.companyname}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label
                  htmlFor="companyname"
                  className={`${user.companyname ? "active" : ""}`}
                >
                  Nombre de compañia
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="md-form">
                <i className="fa fa-phone prefix" />
                <input
                  type="text"
                  id="companyphone"
                  name="companyphone"
                  value={user.companyphone}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label
                  htmlFor="companyphone"
                  className={`${user.companyphone ? "active" : ""}`}
                >
                  Teléfono de compañia
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="md-form">
                <i className="fa fa-user prefix" />
                <input
                  type="text"
                  id="contactname"
                  name="contactname"
                  value={user.contactname}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label
                  htmlFor="contactname"
                  className={`${user.contactname ? "active" : ""}`}
                >
                  Nombre de contacto
                </label>
              </div>
            </div>
            <div className="col-12">
              <button
                disabled={loading || disable}
                type="submit"
                className="btn btn-primary waves-effect"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default ProfileForm;
