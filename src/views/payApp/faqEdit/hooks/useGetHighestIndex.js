import { useMemo } from 'react';

const useGetHighestIndex = (array, key) => {
  const lastQuestionIndex = useMemo(() => {
    return array?.reduce((maxIndex, item) => {
      return item[key] > maxIndex ? item[key] : maxIndex;
    }, 0);
  }, [array]);

  return lastQuestionIndex;
};

export default useGetHighestIndex;
