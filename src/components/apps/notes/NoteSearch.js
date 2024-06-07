import React from 'react';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SearchSpecialOffers } from '../../../store/apps/SpecialOffers/SpecialOffersSlice';

const NoteSearch = () => {
  const searchTerm = useSelector((state) => state.SpecialOffersReducer.SpecialOffersSearch);

  const dispatch = useDispatch();

  return (
    <div className="p-3 border-bottom">
      <Form>
        <div className="position-relative has-icon-left">
          <Input
            className="form-control"
            id="searchNote"
            name="searchNote"
            type="text"
            onChange={(e) => dispatch(SearchSpecialOffers(e.target.value))}
            value={searchTerm}
            placeholder="Search Notes..."
          />
        </div>
      </Form>
    </div>
  );
};

export default NoteSearch;
