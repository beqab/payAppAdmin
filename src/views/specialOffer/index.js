import { Card, CardBody } from 'reactstrap';
import NoteDetail from './NoteDetail';
import SpecialOffersList from './specialOffersList';
import NoteSearch from './NoteSearch';
import TwoColumn from './twoColumn';
import './notes.scss';

const Notes = () => {
  return (
    <>
      <Card>
        <CardBody>
          <TwoColumn
            leftContent={
              <>
                <NoteSearch />
                <SpecialOffersList />
              </>
            }
            rightContent={<NoteDetail />}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Notes;
