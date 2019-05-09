// @flow
import React from 'react';
import { Field, reduxForm } from 'redux-form';

type Props = {
  handleSubmit: () => any,
  loading: boolean,
  pristine?: any,
  invalid?: any,
  submitting?: any
}

const required = value => (value ? undefined : 'Requerido');
let RegionForm = props => {
  const { handleSubmit, pristine, invalid, submitting, loading }: Props = props;
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="regionName"
        label="Nombre de región"
        type="text"
        component={renderField}
        validate={required}
      />
      <button
        className="btn btn-primary waves-effect"
        type="submit"
        disabled={pristine || invalid || submitting || loading}
      >
        Crear región
      </button>
    </form>
  )
};
const renderField = (field) => (
  <div className="md-form">
    <label htmlFor={field.input.name}>
      {field.label}
    </label>
    <input
      {...field.input}
      id={field.input.name}
      type={field.type}
      className={`form-control ${field.meta.touched && field.meta.error ? 'error' : ''}`}
    />
    {field.meta.touched && field.meta.error &&
    <span className="error">{field.meta.error}</span>}
  </div>
);

RegionForm = reduxForm({
  // a unique name for the form
  form: 'regionForm'
})(RegionForm);

export default RegionForm;