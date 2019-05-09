// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Input } from 'react-materialize';

type Props = {
  initialValues: Object,
  handleSubmit: () => any,
  loading: boolean,
  pristine?: any,
  invalid?: any,
  submitting?: any,
  // redux array
  regions: Array<Object>
}

const required = value => (value ? undefined : 'Requerido');
let ProjectForm = props => {
  const {
    handleSubmit,
    pristine,
    invalid,
    submitting,
    loading,
    regions
  }: Props = props;
  return (
    <form onSubmit={ handleSubmit }>
      <Field
        name="region"
        component={renderSelect}
        defaultValue=""
        label="Región"
        regions={regions}
        validate={required}
      />
      <Field
        name="projectName"
        label="Nombre de proyecto"
        type="text"
        component={renderField}
        validate={required}
      />
      <button
        className="btn btn-primary waves-effect"
        type="submit"
        disabled={pristine || invalid || submitting || loading}
      >
        Crear proyecto
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
const renderSelect = (field) => (
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

function mapStateToProps(state): Object {
  return {
    regions: state.regions,
    loading: state.loading
  }
}

ProjectForm = reduxForm({
  // a unique name for the form
  form: 'projectForm'
})(ProjectForm);

export default connect(mapStateToProps)(ProjectForm);