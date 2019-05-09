// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';

type Props = {
  // redux array
  subscribers: Array<Object>,
  // redux form submit
  handleSubmit: () => any,
  pristine: any,
  invalid: any,
  submitting: any,
}
const required = value => (value ? undefined : 'Requerido');
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email es incorrecto'
    : undefined;
export const phoneNumber = (value: string) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;
let RegisterForm = props => {
  const { subscribers, handleSubmit, pristine, invalid, submitting }: Props = props;
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="subscriberId"
        defaultValue=""
        label="Unirse a"
        component={renderSelect}
        validate={required}
      >
        {subscribers.map((sub, index) => (
          <option key={index} value={sub.id}>{sub.company_name}</option>
        ))}
      </Field>
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
      <button
        className="btn btn-outline-primary waves-effect"
        disabled={pristine || invalid || submitting}
      >
        Registrarse
      </button>
    </form>
  )
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
const renderSelect = field => (
  <div className="row">
    <Input
      s={field.size}
      type="select"
      label={field.label}
      defaultValue={field.defaultValue}
      onChange={event => field.input.onChange(event.target.value)}
    >
      <option value="" disabled>Seleccione una opción</option>
      {field.children}
    </Input>
  </div>
);

function mapStateToProps(state: Object): Object {
  return {
    subscribers: state.subscribers
  }
}

RegisterForm = reduxForm({
  // a unique name for the form
  form: 'registerForm'
})(RegisterForm);

export default connect(mapStateToProps)(RegisterForm);