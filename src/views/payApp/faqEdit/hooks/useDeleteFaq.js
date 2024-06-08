import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import Axios from '../../../../services/Axios';
import Endpoints from '../../../../services/endpints';

const useDeleteFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      return Axios.delete(Endpoints.editFaq, {
        params: {
          id,
        },
      }).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('successfully deleted!');

      queryClient.invalidateQueries({ queryKey: ['faq'] });
    },
  });
};

export default useDeleteFaq;
