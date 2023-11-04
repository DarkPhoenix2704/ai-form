import { Field as FieldCell } from '@app/components/field';
import { Field, useForm, useUpdateField } from '@app/hooks';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FieldTypes = [
  'SingleLineText',
  'LongText',
  'SingleSelect',
  'MultiSelect',
  'Rating',
  'Checkbox',
  'Date',
  'Currency',
  'Number',
  'Email',
  'URL',
  'PhoneNumber',
  'Attachment',
];

const EditForm = () => {
  const router = useRouter();
  const formId: string = router.query.id as string;
  const form = useForm({ formId });

  const updateField = useUpdateField({ formId });

  const [activeField, setActiveField] = useState<null | Object>(null);

  useEffect(() => {
    form.refetch();
  }, [form]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-8 flex justify-between py-8 bg-blue-50">
        <h1 className="text-xl">{form.data ? form.data.title : ''}</h1>
        <Button
          onClick={() => {
            setActiveField({
              title: 'New Field',
              type: FieldTypes[0],
            });
          }}
        >
          New Field
        </Button>
      </div>
      <div className="flex w-full">
        <div className="w-1/3">
          {activeField ? (
            <div className="flex mx-4 gap-1 my-4 flex-col">
              <div>
                <label>Field Title</label>
                <Input
                  placeholder="Field Title"
                  type="text"
                  value={activeField.title ?? ''}
                  isRequired
                  onChange={(event) => {
                    setActiveField((e) => {
                      return {
                        ...e,
                        title: event.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div>
                <label>Field Type</label>
                <Select
                  value={activeField.type ?? ''}
                  isRequired
                  onChange={(e) => {
                    setActiveField((ev) => {
                      return {
                        ...ev,
                        type: e.target.value,
                      };
                    });
                  }}
                >
                  {FieldTypes.map((field) => (
                    <SelectItem key={field}>{field}</SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <label>Field Label</label>
                <Input
                  isRequired
                  value={activeField.label ?? ''}
                  placeholder="Field Label"
                  type="text"
                  onChange={(event) => {
                    setActiveField((e) => {
                      return {
                        ...e,
                        label: event.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div>
                <label>Placeholder Text</label>
                <Input
                  placeholder="Placeholder Text"
                  type="text"
                  value={activeField.placeholder ?? ''}
                  isRequired
                  onChange={(event) => {
                    setActiveField((e) => {
                      return {
                        ...e,
                        placeholder: event.target.value,
                      };
                    });
                  }}
                />
              </div>
              <Button
                onClick={async () => {
                  await updateField.mutateAsync(activeField as Field);
                  await form.refetch();
                }}
              >
                Save Field
              </Button>
            </div>
          ) : (
            <>
              Select a Field to edit or
              <Button
                variant="solid"
                onClick={() => {
                  setActiveField({
                    title: 'New Field',
                    type: FieldTypes[0],
                  });
                }}
              >
                New Field
              </Button>
            </>
          )}
        </div>
        <div className="w-2/3">
          {form.data &&
            form.data.fields &&
            form.data.fields.map((field) => {
              return (
                <FieldCell
                  key={field.id}
                  field={field}
                  editEnabled={true}
                  onChange={() => {}}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
