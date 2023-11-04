import {
  Checkbox,
  Currency,
  DateCell,
  Email,
  LongText,
  MultiSelect,
  Number,
  PhoneNumber,
  Rating,
  SingleSelect,
  Text,
} from '@app/components/cell';
import { Button } from '@nextui-org/react';
import { useState } from 'react';

const IndexPage = () => {
  const [text, setText] = useState('Hello World');
  const [isChecked, setIsChecked] = useState(false);
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState(new Date().toISOString());
  const [selectOptions, setSelectOptions] = useState(['Hey', 'Helop']);
  return (
    <div className="flex flex-col mx-16 py-16 w-full h-full">
      <div className="flex w-full items-end">
        <Button color="primary">Create new Form</Button>
      </div>
    </div>
  );
};

export default IndexPage;
