import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { MdOutlineEdit } from 'react-icons/md';
const forms = [
  {
    name: 'Form 1',
    desc: 'Form 1 description',
  },
  {
    name: 'Form 2',
    desc: 'Form 2 description',
  },
  {
    name: 'Form 3',
    desc: 'Form 3 description',
  },
  {
    name: 'Form 4',
    desc: 'Form 4 description',
  },
];

const IndexPage = () => {
  return (
    <div className="flex flex-col px-16 py-16 w-full h-full">
      <div className="flex w-full justify-end">
        <Button color="primary">Create new Form</Button>
      </div>
      <div className="flex mt-2 gap-1 flex-col">
        {forms.map((form) => (
          <Card>
            <CardHeader>
              <div className="flex w-full justify-between">
                <h3>{form.name}</h3>
                <MdOutlineEdit className="ml-2 cursor-pointer" />
              </div>
            </CardHeader>
            <CardBody>
              <p>{form.desc}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
