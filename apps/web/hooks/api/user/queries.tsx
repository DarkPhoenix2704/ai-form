import { apiHandler } from '@app/api';
import { useQuery } from '@tanstack/react-query';
import { User } from './types';

export const useAuthUser = () => {
  return useQuery<{}, {}, User>({
    queryKey: ['authUser'],
    queryFn: async () => {
      const { data } = await apiHandler.get('/user');
      return data;
    },
  });
};
