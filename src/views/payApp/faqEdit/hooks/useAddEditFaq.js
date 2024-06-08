import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Axios from '../../../../services/Axios';
import Endpoints from '../../../../services/endpints';

const useAddEditFaq = (cb) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestData) => {
      return Axios.post(Endpoints.editFaq, requestData).then((res) => res.data);
    },
    onSuccess: () => {
      toast.success('updated successfully!');

      queryClient.invalidateQueries({ queryKey: ['faq'] });

      cb();
    },
  });
};

export default useAddEditFaq;
