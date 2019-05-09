import React, { Component, PropTypes } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
  };
  render() {
    const { login, handleInputChange, email, password, loading } = this.props;
    return (
      <Form>
        <div className="row">
          <div className="col-sm-12">
            <div className="md-form">
              <label htmlFor="email">Correo electrónico</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="md-form">
              <label htmlFor="password">Contraseña</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-primary waves-effect"
          onClick={login}
          disabled={loading}
        >
          Iniciar
        </button>
      </Form>
    );
  }
}
export default LoginForm;
