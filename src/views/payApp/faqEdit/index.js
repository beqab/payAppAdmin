import React, { useState } from 'react';

import { Alert, Button, Col, Row } from 'reactstrap';

import ComponentCard from '../../../components/ComponentCard';
import EditFaqModal from './components/editFaqModal';
import useDeleteFaq from './hooks/useDeleteFaq';
import useFaq from './hooks/useFaq';
import useGetHighestIndex from './hooks/useGetHighestIndex';

const BasicForm = () => {
  const [composeModal, setComposeModal] = useState(null);

  const { data } = useFaq();

  const highestIndex = useGetHighestIndex(data, 'index');

  const deleteFaq = useDeleteFaq();

  const HandleDelete = (id) => {
    const userConfirmed = window.confirm(`Are you sure you want to delete?`);

    if (userConfirmed) {
      deleteFaq.mutate(id);
    }
  };

  const toggle = (id = null) => {
    if (composeModal) {
      setComposeModal(null);
    } else {
      setComposeModal(id);
    }
  };

  return (
    <div>
      <h4 className="text-capitalize">FAQ Edit</h4>

      <Button onClick={() => toggle('add')} color="success" className="me-4 mb-4">
        Ddd new Question
      </Button>
      <Row>
        <Col md="12">
          {data?.map((item, i) => {
            return (
              <ComponentCard key={item._id} title={i + 1}>
                <h4 className="mb-3">EN</h4>

                <Alert color="dark" className="p-2">
                  {item.questEN}
                </Alert>

                <Alert color="info" className="p-2">
                  {item.answEN}
                </Alert>
                <h4 className="mb-3">RU</h4>

                <Alert color="dark" className="p-2">
                  {item.question}
                </Alert>

                <Alert color="info" className="p-2">
                  {item.answer}
                </Alert>
                <div className="   d-flex  justify-content-end">
                  <Button onClick={() => toggle(item)} color="primary" className="me-4">
                    Edit
                  </Button>

                  <Button
                    disabled={deleteFaq.isPending}
                    onClick={() => HandleDelete(item._id)}
                    color="danger"
                  >
                    {deleteFaq.isPending ? 'Deleting' : 'Delete'}
                  </Button>
                </div>
              </ComponentCard>
            );
          })}
        </Col>
      </Row>

      <EditFaqModal
        toggle={toggle}
        composeModal={composeModal}
        index={composeModal === 'edit' ? composeModal.index : highestIndex + 1}
      />
    </div>
  );
};

export default BasicForm;
