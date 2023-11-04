import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import { MdOutlineEdit } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
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
      <div className="flex w-full gap-1">
        <Input
          placeholder="Type your usecase to generate Form"
          className="w-full"
        />

        <Button color="primary">Create new Form</Button>
      </div>
      <div className="flex mt-2 gap-1 flex-col">
        {forms.map((form) => (
          <div className="flex border-1 p-2 cursor-pointer rounded-md w-full shadow-sm">
            <div className="flex flex-grow flex-col gap-1">
              <h1>{form.name}</h1>
              <h4>{form.desc}</h4>
            </div>
            <div className="flex items-center justify-center">
              <Popover placement="left">
                <PopoverTrigger>
                  <SlOptionsVertical className="w-4 h-4 mr-2" />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className="py-1 w-full flex items-center gap-1 justify-left">
                    <MdOutlineEdit className="w-4 h-4" />
                    Edit
                  </h2>
                  <h2 className="py-1 justify-left w-full flex hover:first-letter:bg-red-50 text-red-500 items-center gap-1 justify-center">
                    <MdOutlineEdit className="w-4 h-4" />
                    Delete
                  </h2>
                  <h2 className="py-1 flex justify-left items-center gap-1 justify-center">
                    <MdOutlineEdit className="w-4 h-4" />
                    Share Link
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
