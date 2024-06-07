import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader } from 'reactstrap';
import { setVisibilityFilter } from '../../store/apps/contacts/BookingsSlice';
import ContactAdd from './ContactAdd';

const BookingFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.bookingsReducer.currentFilter);
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      {/* <div className="p-3 border-bottom">
        <Button color="danger" block onClick={toggle}>
          Add New Contact
        </Button>
      </div> */}
      <ListGroup flush>
        <h6 className="px-3 pt-3">ფილტრი ჯავშნის ტიპებით </h6>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'show_all' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('show_all'))}
        >
          <i className="bi bi-people mx-1" /> ყველა
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'type-1' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('type-1'))}
        >
          <i className="bi bi-bezier mx-1" /> ჯავშნის მთხოვნა
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'type-2' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('type-2'))}
        >
          <i className="bi bi-star mx-1" /> სპეციალური შეთავაზება
        </ListGroupItem>
        <div className="border-bottom py-2 mb-2" />
        <h6 className="px-3 pt-3">ფილტრი სტატუსის მიხედვით</h6>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'status-0' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('status-0'))}
        >
          <i style={{ color: 'green' }} className="bi bi-bookmark-star mx-1" /> ელოდება პასუხს
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'status-1' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('status-1'))}
        >
          <i style={{ color: 'purple' }} className="bi bi-bookmark-star mx-1" /> მიმდინარე
        </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'status-2' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('status-2'))}
        >
          <i style={{ color: 'orange' }} className="bi bi-bookmark-star mx-1" /> დასრულებული
        </ListGroupItem>
      </ListGroup>
      {/***********Contact Add Box**************/}
      {/* <Modal isOpen={modal} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Add Contact</ModalHeader>
        <ContactAdd click={toggle} />
      </Modal> */}
      {/***********Contact Add Box End**************/}
    </>
  );
};

export default BookingFilter;
