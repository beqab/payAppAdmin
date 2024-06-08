import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Endpoints from '../../../../services/endpints';
import Axios from '../../../../services/Axios';

const useUpdateCountriesStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData) => {
      return Axios.post(Endpoints.updateCountries, requestData).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('updated successfully!');

      queryClient.invalidateQueries({ queryKey: ['countries'] });
    },
  });
};

export default useUpdateCountriesStatus;
