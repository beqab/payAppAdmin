import { toast } from 'react-toastify';

const responseError = (err, setErrors = null) => {
  if (err && err.response && err.response.status === 400) {
    // toast.error('გთხოვთ შემოწმოთ რეგისტრაციის ველები', {});

    if (setErrors) {
      setErrors(err.response.data.errors);
    }
  } else if (err && err.response && err.response.status === 401) {
    toast.error(err.response.data.msg, {});
  } else {
    toast.error('დაფიქსირდა შეცდომა', {});
  }
};

export default responseError;
