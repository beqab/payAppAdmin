import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

const OfferDeleteConfirmation = ({
  setOpenConfirmation,
  openConfirmation,
  confirmCallback,
  modalTitle,
  children,
}) => {
  //   const [openConfirmation, setOpenConfirmation] = useState(false);

  function toggle() {
    setOpenConfirmation(!openConfirmation);
  }

  return (
    <>
      <Modal isOpen={openConfirmation} size="lg">
        <ModalHeader toggle={toggle}>{modalTitle || 'დადასტურება'}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => confirmCallback()}>
            დადასტურება
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            გაუქმება
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OfferDeleteConfirmation;
