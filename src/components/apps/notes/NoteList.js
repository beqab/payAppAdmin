import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'reactstrap';
import NoteListItem from './NoteListItem';
import {
  fetchSpecialOffers,
  SelectOffer,
  DeleteSpecialOffer,
} from '../../../store/apps/SpecialOffers/SpecialOffersSlice';

const NoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    alert('mm');
    dispatch(fetchSpecialOffers());
  }, []);

  const filterNotes = (notes, noteSearch) => {
    if (noteSearch !== '')
      return notes.filter(
        (t) =>
          !t.deleted &&
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
  const active = useSelector((state) => state.SpecialOffersReducer.SpecialOffersContent);

  return (
    <Nav>
      {notes && notes.length
        ? notes.map((note) => (
            <NoteListItem
              key={note.id}
              {...note}
              active={active}
              onClick={() => dispatch(SelectOffer(note.id))}
              onDeleteClick={() => dispatch(DeleteSpecialOffer(note.id))}
              noteTitle={note.title}
              noteColor={note.color}
              noteDatef={new Date(note.datef).toLocaleDateString({
                weekday: 'short',
                year: 'numeric',
                month: 'short',
              })}
            />
          ))
        : 'no notes'}
    </Nav>
  );
};

export default NoteList;
