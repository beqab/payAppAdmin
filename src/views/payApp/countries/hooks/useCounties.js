import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Endpoints from '../../../../services/endpints';

const useCountries = () => {
  const fetchCountries = () => {
    return axios.get(Endpoints.getCountries).then((res) => res.data);
  };

  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 10 * 1000,
  });
};

export default useCountries;
