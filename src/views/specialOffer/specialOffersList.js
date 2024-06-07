import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'reactstrap';
import SpecialOfferListItem from './SpecialOfferListItem';
import {
  fetchSpecialOffers,
  SelectOffer,
  DeleteSpecialOffer,
  setDetailType,
} from '../../store/apps/SpecialOffers/SpecialOffersSlice';

const NoteList = () => {
  const profile = useSelector((state) => state.profileReducer.profile);
  const id = profile ? profile.id : null;
  // debugger;
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchSpecialOffers(id));
    }
  }, [dispatch, id]);

  const filterNotes = (notes, noteSearch) => {
    if (noteSearch !== '')
      return notes.filter((t) =>
        t.title.toLocaleLowerCase().concat(' ').includes(noteSearch.toLocaleLowerCase()),
      );
    return notes.filter((t) => !t.deleted);
  };

  const notes = useSelector((state) =>
    filterNotes(
      state.SpecialOffersReducer.SpecialOffers,
      state.SpecialOffersReducer.SpecialOfferSearch,
    ),
  );

  // const notes = [];
  const active = useSelector((state) => state.SpecialOffersReducer.SpecialOffersContent);

  return (
    <Nav>
      {notes && notes.length ? (
        notes.map((SpecialOffer) => (
          <SpecialOfferListItem
            key={SpecialOffer._id}
            {...SpecialOffer}
            active={active}
            price={SpecialOffer.price}
            onClick={() => {
              dispatch(SelectOffer(SpecialOffer._id));
              dispatch(setDetailType('preview'));
            }}
            onDeleteClick={() => dispatch(DeleteSpecialOffer(SpecialOffer._id))}
            SpecialOfferTitle={SpecialOffer.title}
            SpecialOfferColor={SpecialOffer.color}
            SpecialOfferDatef={new Date(SpecialOffer.updateDate).toLocaleDateString({
              weekday: 'short',
              year: 'numeric',
              month: 'short',
            })}
          />
        ))
      ) : (
        <div className="text-center pt-5"> თქვენ არ გაქვთ სპეციალური შეთავაზებები </div>
      )}
    </Nav>
  );
};

export default NoteList;
