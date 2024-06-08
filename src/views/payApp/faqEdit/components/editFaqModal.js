import { Field, Form, Formik } from 'formik';
import { Button, FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import useAddEditFaq from '../hooks/useAddEditFaq';

const EditFaqModal = ({ composeModal, toggle, index }) => {
  const initialValues = {
    answEN: composeModal?.answEN || '',
    questEN: composeModal?.questEN || '',
    answer: composeModal?.answer || '',
    question: composeModal?.question || '',
  };

  const isAddNew = composeModal === 'add';

  const updateQuestion = useAddEditFaq(() => toggle(null));

  const handleSubmit = (fields) => {
    updateQuestion.mutate({ ...fields, index, _id: composeModal?._id });
  };

  return (
    <Modal isOpen={!!composeModal} size="lg">
      <ModalHeader toggle={toggle}>
        {isAddNew ? 'Add New Question' : `Edit Question  ${composeModal?.index}`}{' '}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          render={({ errors, touched }) => (
            <Form>
              <FormGroup>
                <Label>Question En</Label>
                <Field name="questEN" type="text" className="form-control" />
              </FormGroup>
              <FormGroup>
                <Label> Answer En</Label>
                <Field name="answEN" as="textarea" rows="5" className="form-control" />
              </FormGroup>
              <FormGroup>
                <Label>Question Ru</Label>
                <Field name="question" type="text" className="form-control" />
              </FormGroup>
              <FormGroup>
                <Label> Answer Ru</Label>

                <Field name="answer" as="textarea" rows="5" className="form-control" />
              </FormGroup>
              <div className=" d-flex justify-content-end">
                <Button disabled={updateQuestion.isPending} type="submit" color="primary">
                  {updateQuestion.isPending ? 'Submitting' : 'Submit'}
                </Button>
              </div>
            </Form>
          )}
        />
      </ModalBody>
    </Modal>
  );
};

export default EditFaqModal;
