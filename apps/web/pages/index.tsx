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
import { useState } from 'react';

const IndexPage = () => {
  const [text, setText] = useState('Hello World');
  const [isChecked, setIsChecked] = useState(false);
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState(new Date().toISOString());
  const [selectOptions, setSelectOptions] = useState(['Hey', 'Helop']);
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {/* <label>Single Line Text</label>
      <Text
        editEnabled
        onChange={(e) => {
          setText(e);
        }}
        value={text}
      />
      <label>Long Text</label>
      <LongText
        editEnabled
        onChange={(e) => {
          setText(e);
        }}
        value={text}
      />
      <label>Checkbox</label>
      <Checkbox
        editEnabled={true}
        value={isChecked}
        onChange={(v) => {
          setIsChecked(v);
        }}
      /> */}
      <label>Phone Number</label>
      <PhoneNumber editEnabled value={text} onChange={(e) => setText(e)} />
      <label>Email</label>
      <Email editEnabled value={text} onChange={(e) => setText(e)} />
      <label>Number</label>
      <Number editEnabled value={text} onChange={(e) => setText(e)} />
      <label>Currency</label>
      <Currency
        editEnabled
        value={text}
        currency={'$'}
        onChange={(e) => setText(e)}
      />
      <label>Rating</label>
      <Rating
        editEnabled
        value={number}
        maxVal={10}
        onChange={(e) => setNumber(e)}
      />
      <label>Date</label>
      <DateCell editEnabled value={date} onChange={(e) => setDate(e)} />

      <label>Single Select</label>
      <SingleSelect
        editEnabled
        value={date}
        onChange={(e) => setText(e)}
        options={['Hey', 'Helop']}
      />
      <label>Multi Select</label>
      <MultiSelect
        editEnabled
        value={selectOptions}
        onChange={(e) => setText(e)}
        options={['Hey', 'Helop']}
      />
    </div>
  );
};

export default IndexPage;
