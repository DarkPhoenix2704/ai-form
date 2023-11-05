import { useForm, useSubmitForm } from '@app/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Field } from '@app/components/field';
import { Button } from '@nextui-org/react';

const Form = () => {
  const router = useRouter();
  const formId: string = router.query.id as string;
  const form = useForm({ formId });

  const submitForm = useSubmitForm({ formId });

  useEffect(() => {
    form.refetch();
  }, [form]);

  return (
    <div className="justify-center bg-[#f9f9fa] min-h-[100vh] flex">
      {!form.isLoading && form.data && !submitForm.isSuccess && (
        <div className="w-[35rem] mt-16 bg-white rounded-md shadow-sm p-4">
          <h1 className="text-2xl font-semibold">{form.data.title}</h1>
          <p>{form.data.description}</p>

          <div className="flex flex-col mt-8 gap-2">
            {form.data.fields &&
              form.data.fields.map((field) => {
                return (
                  <div className={`px-1  py-2`}>
                    <div className="gap-1 flex flex-col ">
                      <label>
                        {field.label} {field.required ? '*' : ''}
                      </label>
                      <Field
                        key={field.id}
                        field={field}
                        editEnabled={true}
                        onChange={(e) => {
                          setResponse((res) => {
                            return {
                              ...res,
                              [field.id]: e,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <Button
            className="mt-4 w-full"
            size="sm"
            isLoading={submitForm.isPending}
            color="primary"
            onClick={async () => {
              await submitForm.mutateAsync(response);
            }}
          >
            Submit
          </Button>
        </div>
      )}
      {submitForm.isSuccess && (
        <div className="w-[35rem] mt-16 bg-white rounded-md shadow-sm p-4">
          <h1 className="text-2xl font-semibold">Form Submitted</h1>
          <p>Thank you for submitting the form</p>
        </div>
      )}
    </div>
  );
};

export default Form;
