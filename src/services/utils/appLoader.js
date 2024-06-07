// import Axios from '../Axios';
import Axios from 'axios';
import Endpoints from '../endpints';

const appLoader = async () => {
  console.log('callformappLoader');

  try {
    const res = Axios.get(Endpoints.profile.get());
    console.log(res);
    console.log(res, 'restaurantProfileLoader');

    return res;
  } catch (err) {
    console.log(err, 'appLoader');
  }
  return null;
};

export default appLoader;
