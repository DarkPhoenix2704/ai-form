import { Field as FieldCell } from '@app/components/field';
import { Field, useForm, useResponses, useUpdateField } from '@app/hooks';
import {
  Button,
  Input,
  Select,
  SelectItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';

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

const EditForm: NextPageWithLayout = () => {
  const router = useRouter();
  const formId: string = router.query.id as string;
  const form = useForm({ formId });

  const responses = useResponses({ formId });

  const [jsonRes, setJsonRes] = useState();

  const updateField = useUpdateField({ formId });

  const [activeField, setActiveField] = useState<null | Object>(null);

  useEffect(() => {
    form.refetch();
  }, [form]);

  /*   useEffect(() => {
    if (!responses.data) return;
    if (!responses.data.length) return;
    const json = responses.data.map((res) => {
      if (!res.data) return;
      return JSON.parse(res.data);
    });
    console.log(json);

    setJsonRes(json);
  }, []); */

  return (
    <div className="flex flex-col w-full">
      <Tabs>
        <Tab key="edit" title="Edit Form">
          <div className="w-full px-8 flex justify-between py-8 bg-blue-50">
            <h1 className="text-xl">{form.data ? form.data.title : ''}</h1>
            <Button
              color="primary"
              variant="solid"
              onClick={() => {
                navigator.clipboard.writeText(`localhost:3000/form/${formId}`);
              }}
            >
              Share Form
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
                  <div className="py-1">
                    <Select
                      label="Field Type"
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
                    color="primary"
                    onClick={async () => {
                      await updateField.mutateAsync(activeField as Field);
                      await form.refetch();
                      setActiveField(null);
                    }}
                  >
                    Save Field
                  </Button>
                  <Button
                    className="w-full"
                    color="danger"
                    variant="solid"
                    onClick={() => {
                      setActiveField(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  Select a Field to edit or <br />
                  <Button
                    className="w-full"
                    color="primary"
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
            <div className="w-2/3 px-16">
              {form.data && (
                <div>
                  <h1 className="text-2xl pt-2 font-semibold">
                    {form.data.title}
                  </h1>
                  <p>{form.data.description}</p>
                  {form.data.fields &&
                    form.data.fields.map((field) => {
                      return (
                        <div
                          className={`px-1 w-[25rem] py-2 ${
                            activeField && activeField.id === field.id
                              ? ' border-2 bg-blue-50 rounded-md border-blue-500'
                              : ''
                          }}`}
                          onClick={() => {
                            setActiveField(field);
                          }}
                        >
                          <div className="w-96 gap-1 flex flex-col ">
                            <label>{field.label}</label>
                            <FieldCell
                              key={field.id}
                              field={field}
                              editEnabled={true}
                              onChange={() => {}}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </Tab>
        <Tab key="table" title="View Response">
          {/* <Table>
            <TableHeader>
              {form.data && form.data.fields ? (
                form.data?.fields.map((e) => {
                  return <TableColumn>{e.title}</TableColumn>;
                })
              ) : (
                <></>
              )}
            </TableHeader>
            <TableBody>
              {jsonRes && jsonRes.length ? (
                jsonRes.map((res) => (
                  <TableRow>
                    <TableCell>{res}</TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table> */}
        </Tab>
      </Tabs>
    </div>
  );
};

EditForm.requiresAuth = true;
export default EditForm;
