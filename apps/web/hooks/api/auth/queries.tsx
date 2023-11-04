import { apiHandler } from '@app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation<{}, {}, {}>({
    mutationFn: async () => {
      const { data } = await apiHandler.post('/auth/logout', {});
      queryClient.clear();
      return data;
    },
  });
};
