import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Endpoints from '../../../../services/endpints';

const useFaq = () => {
  const fetchCountries = () => {
    return axios.get(Endpoints.getFaq).then((res) => res.data);
  };

  return useQuery({
    queryKey: ['faq'],
    queryFn: fetchCountries,
    staleTime: 10 * 1000,
  });
};

export default useFaq;
