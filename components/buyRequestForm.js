import React, { Component, PropTypes } from "react"; import { Form } from "reactstrap"; import { Input } from "react-materialize"; class BuyRequestForm extends Component { static propTypes = { disable: PropTypes.bool.isRequired, readOnly: PropTypes.bool.isRequired, toggleModal: PropTypes.func, regions: PropTypes.arrayOf( PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired }) ).isRequired, regionSelectChange: PropTypes.func.isRequired, projectSelectChange: PropTypes.func.isRequired, supervisorSelectChange: PropTypes.func.isRequired, selectedRegion: PropTypes.number.isRequired, selectedProject: PropTypes.number.isRequired, selectedSupervisor: PropTypes.number.isRequired, projects: PropTypes.arrayOf( PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired }) ).isRequired, supervisors: PropTypes.array.isRequired, articleName: PropTypes.string.isRequired, quantity: PropTypes.number.isRequired, note: PropTypes.string.isRequired, workOrder: PropTypes.string.isRequired, handleInputChange: PropTypes.func.isRequired, submitForm: PropTypes.func.isRequired, loading: PropTypes.bool.isRequired }; constructor() { super(); } componentDidMount() { console.log(this.props.disable); } render() { const { readOnly, toggleModal, regions, regionSelectChange, projectSelectChange, supervisorSelectChange, selectedRegion, selectedProject, selectedSupervisor, projects, supervisors, articleName, addProduct, products, quantity, note, workOrder, handleInputChange, submitForm, loading, disable } = this.props; return (
  <Form className="row">
      <div className="col-12">
          <div className="row">
              <Input s={12} onChange={regionSelectChange} defaultValue={selectedRegion} type="select" label="Seleccione una región">
              <option value="0" disabled>Seleccione una opción</option>
              {regions.map((region, index) => (
              <option key={index} value={region.id}>{region.name}</option>
              ))}
              </Input>
          </div>
          <div className="row">
              <Input s={12} onChange={projectSelectChange} defaultValue={selectedProject} type="select" label="Seleccione proyecto" disabled={projects.length===0 }>
              <option value="0">Seleccione una opción</option>
              {projects.map((project, index) => (
              <option key={index} value={project.id}>{project.name}</option>
              ))}
              </Input>
          </div>
          <div className="row">
              <Input s={12} onChange={supervisorSelectChange} defaultValue={selectedSupervisor} type="select" label="Seleccione supervisor" disabled={supervisors.length===0 }>
              <option value="0">Seleccione una opción</option>
              {supervisors.map((supervisor, index) => (
              <option key={index} value={supervisor.id}>
                  {supervisor.name} {supervisor.lastname}
              </option>
              ))}
              </Input>
          </div>
          <div className="row">
              <div className="col-12">
                  <div className="md-form">
                      <label htmlFor="articleName">Nombre de artículo</label>
                      <input type="text" name="articleName" id="articleName" className="form-control" value={articleName} onChange={handleInputChange} />
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-3">
                  <div className="md-form">
                      <label className="active" htmlFor="quantity">Cantidad</label>
                      <input type="number" name="quantity" id="amount" className="form-control" value={quantity} onChange={handleInputChange} />
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-12">
                  <div className="md-form">
                      <label htmlFor="note">
                          Nota{" "}
                          <span style={{ fontStyle: "italic", fontWeight: "lighter" }}>
                        -opcional
                      </span>
                      </label>
                      <textarea type="text" name="note" id="note" className="md-textarea" value={note} onChange={handleInputChange} />
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-12">
                  <div className="md-form">
                      <label htmlFor="workOrder">
                          Work Order{" "}
                          <span style={{ fontStyle: "italic", fontWeight: "lighter" }}>
                        -opcional
                      </span>
                      </label>
                      <input type="text" name="workOrder" id="workOrder" className="form-control" value={workOrder} onChange={handleInputChange} />
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-6">
                  <button onClick={submitForm} className="btn btn-outline-primary waves-effect" type="submit" disabled={loading || disable}>
                      Someter
                  </button>
              </div>
              <div className="col-6">
                  <button onClick={addProduct} className="btn btn-outline-primary waves-effect" type="submit" disabled={ false }>
                      Añadir
                  </button>
              </div>
          </div>
  
          {products.map((req, index) => (
          <div className="row">
              <div className="col-12">
                  <div className="md-form">
                      <label htmlFor="articleName">Nombre de artículo</label>
                      <input type="text" name="articleName" id="articleName" className="form-control" value={articleName} onChange={handleInputChange} />
                  </div>
              </div>
              <div className="col-3">
                  <div className="md-form">
                      <label className="active" htmlFor="quantity">Cantidad</label>
                      <input type="number" name="quantity" id="amount" className="form-control" value={quantity} onChange={handleInputChange} />
                  </div>
              </div>
          </div>
          ))}
  
      </div>
  </Form>
  ); } } export default BuyRequestForm;