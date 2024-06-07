import { Card, CardBody } from 'reactstrap';
import BookingsList from './BookingsList';
import BookingSearch from './BookingSearch';
import BookingDetails from './BookingDetails';
import ThreeColumn from '../../components/threeColumn/ThreeColumn';
import BookingFilter from './BookingFilter';
import './bookings.scss';

const Bookings = () => {
  return (
    <Card>
      <CardBody>
        <ThreeColumn
          leftContent={<BookingFilter />}
          middleContent={
            <>
              <BookingSearch />
              <BookingsList />
            </>
          }
          rightContent={<BookingDetails />}
        />
      </CardBody>
    </Card>
  );
};

export default Bookings;
