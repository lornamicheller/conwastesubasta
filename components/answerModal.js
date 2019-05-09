import React, { Component, PropTypes } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class AnswerModal extends Component {
  static propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    selectedRequest: PropTypes.number.isRequired,
    modalTitle: PropTypes.string.isRequired
  };
  render() {
    const { modal, toggle, children, selectedRequest, modalTitle } = this.props;
    return (
      <Modal
        backdrop="static"
        isOpen={modal}
        toggle={toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => toggle("accept", "noteeee", selectedRequest)}
          >
            Enviar
          </Button>
          {" "}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default AnswerModal;
