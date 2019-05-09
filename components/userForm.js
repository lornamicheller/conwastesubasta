import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Input } from "react-materialize";

const required = value => value ? undefined : "Requerido";
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email incorrecto"
    : undefined;
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

let UserForm = props => {
  const {
    handleSubmit,
    initialValues,
    regions,
    loading,
    invalid,
    pristine,
    supplierForm,
    userForm
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      {!supplierForm &&
        userForm &&
        <Field
          name="userType"
          component={renderUserTypeSelect}
          defaultValue={userForm.values.userType || initialValues.userType}
          label="Tipo de usuario"
          validate={required}
        />}
      {!supplierForm &&
        userForm &&
        userForm.values.userType !== "3" &&
        userForm.values.userType !== "5" &&
        userForm.values.userType !== "6" &&
        <Field
          name="region"
          component={renderRegionSelect}
          defaultValue={userForm.values.region || initialValues.region}
          label="Región"
          regions={regions}
          validate={required}
        />}
      <Field
        name="name"
        component={renderField}
        type="text"
        label="Nombre"
        validate={required}
      />
      <Field
        name="lastname"
        component={renderField}
        type="text"
        label="Apellido"
        validate={required}
      />
      <Field
        name="email"
        component={renderField}
        type="email"
        label="Email"
        validate={[required, email]}
      />
      <Field
        name="companyname"
        component={renderField}
        type="text"
        label="Nombre de compañia -opcional"
      />
      <Field
        name="companyphone"
        component={renderField}
        type="tel"
        label="Número de compañia -opcional"
        validate={phoneNumber}
      />
      <Field
        name="contactname"
        component={renderField}
        type="text"
        label="Nombre de contacto -opcional"
      />
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary waves-effect"
          disabled={loading || invalid || pristine}
        >
          Crear usuario
        </button>
      </div>
    </form>
  );
};
const renderField = field => (
  <div className="md-form">
    <input
      {...field.input}
      type={field.type}
      id={field.input.name}
      name={field.input.name}
      className={
        `form-control ${field.meta.touched && field.meta.error ? "error" : ""}`
      }
    />
    <label htmlFor={field.input.name}>{field.label}</label>
    {field.meta.touched &&
      field.meta.error &&
      <span className="error inputError">{field.meta.error}</span>}
  </div>
);

const renderUserTypeSelect = field => (
  <div className="row">
    <Input
      s={field.size}
      type="select"
      label={field.label}
      name={field.name}
      defaultValue={field.defaultValue}
      onChange={event => field.input.onChange(event.target.value)}
    >
      <option value="" disabled>Seleccione una opción</option>
      <option value="1">Supervisor</option>
      <option value="2">Comprador</option>
      <option value="3">Suplidor</option>
      <option value="4">Usuario Regular</option>
      <option value="5">Administrador</option>
      <option value="6">Contador</option>
    </Input>
    {field.meta.touched &&
      field.meta.error &&
      <span className="error inputError">{field.meta.error}</span>}
  </div>
);

const renderRegionSelect = field => (
  <div className="row">
    <Input
      s={field.size}
      type="select"
      label={field.label}
      defaultValue={field.defaultValue}
      onChange={event => field.input.onChange(event.target.value)}
    >
      <option value="" disabled>Seleccione una opción</option>
      {field.regions.map((region, index) => (
        <option key={index} value={region.id}>{region.name}</option>
      ))}
    </Input>
  </div>
);

function mapStateToProps(state) {
  return {
    regions: state.regions,
    loading: state.loading,
    userForm: state.form.userForm
  };
}

UserForm = reduxForm({
  // a unique name for the form
  form: "userForm"
})(UserForm);

export default connect(mapStateToProps)(UserForm);
