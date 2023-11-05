import { apiHandler } from '@app/api';
import { Field, Form, FormCreateInput, FormWithFields } from './types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useForms = () => {
  return useQuery<{}, {}, Form[]>({
    queryKey: ['forms'],
    queryFn: async () => {
      const { data } = await apiHandler.get('/form');
      return data;
    },
  });
};

export const useMutateForm = () => {
  return useMutation({
    mutationKey: ['forms'],
    mutationFn: async (form: FormCreateInput) => {
      const { data } = await apiHandler.post('/form', form);
      return data;
    },
  });
};

export const useForm = ({ formId }: { formId: string }) => {
  return useQuery<{}, {}, FormWithFields>({
    queryKey: ['forms'],
    queryFn: async () => {
      const { data } = await apiHandler.get(`/form/${formId}`);
      return data;
    },
  });
};

export const useUpdateField = ({ formId }: { formId: string }) => {
  return useMutation({
    mutationKey: ['forms'],
    mutationFn: async (form: Field) => {
      const { data } = await apiHandler.post(`/form/${formId}`, form);
      return data;
    },
  });
};

export const useSubmitForm = ({ formId }: { formId: string }) => {
  return useMutation({
    mutationKey: ['forms'],
    mutationFn: async (form: any) => {
      const { data } = await apiHandler.post(`/form/${formId}/submit`, form);
      return data;
    },
  });
};

export const useResponses = ({ formId }: { formId: string }) => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: async () => {
      const { data } = await apiHandler.get(`/form/${formId}/response`);

      return data;
    },
  });
};
