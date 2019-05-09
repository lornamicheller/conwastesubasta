import React, { Component, PropTypes } from "react";
import Link from "next/link";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class AddSupplierModal extends Component {
  static propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    suppliers: PropTypes.array.isRequired,
    pendingSuppliers: PropTypes.array.isRequired,
    setPendingToAdd: PropTypes.func.isRequired,
    addSuppliers: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };
  render() {
    const {
      modal,
      toggle,
      suppliers,
      pendingSuppliers,
      setPendingToAdd,
      addSuppliers,
      loading
    } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader>Agregar suplidores</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-sm-12">
              <div className="md-form">
                <i className="fa fa-search prefix" />
                <input type="text" id="form1" className="form-control" />
                <label htmlFor="form1" className="">Buscar suplidor</label>
              </div>
            </div>
            <div className="col-sm-12">
              <h5>Lista de suplidores para agregar:</h5>
              <div className="list-group">
                {suppliers.map((supplier, index) => (
                  <a
                    key={index}
                    href="#"
                    style={{ cursor: "pointer" }}
                    className="list-group-item list-group-item-action"
                    onClick={() => setPendingToAdd(supplier)}
                  >
                    {supplier.companyname}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-sm-12" style={{ marginTop: 25 }}>
              <h5>Lista de suplidores listos para ser agregados:</h5>
              <div className="list-group">
                {pendingSuppliers.map((supplier, index) => (
                  <a
                    key={index}
                    href="#"
                    className="list-group-item list-group-item-success"
                  >
                    {supplier.companyname}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Link href="/dashboard/applications/create-supplier">
            <a
              style={{ float: "left" }}
              disabled={loading}
              className="btn btn-blue-grey waves-effect"
            >
              Invitar/crear suplidor nuevo
            </a>
          </Link>
          {" "}
          <button
            disabled={loading || pendingSuppliers.length <= 0}
            className="btn btn-primary waves-effect"
            onClick={addSuppliers}
          >
            Agregar
          </button>
          {" "}
          <button
            disabled={loading}
            className="btn btn-danger waves-effect"
            onClick={toggle}
          >
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default AddSupplierModal;
