import { Field } from '@app/hooks';
import {
  Checkbox,
  LongText,
  MultiSelect,
  Rating,
  SingleSelect,
  Text,
  DateCell,
  Currency,
  Number,
  Email,
  URLField,
  PhoneNumber,
} from '.';

const Field = ({
  field,
  editEnabled = true,
  onChange = (_) => {},
}: {
  field: Field;
  editEnabled: boolean;
  onChange: (value: any) => void;
}) => {
  if (field.type === 'SingleLineText') {
    return (
      <Text
        placeholder={field.placeholder}
        isRequired={field.required}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  } else if (field.type === 'LongText') {
    return (
      <LongText
        placeholder={field.placeholder}
        isRequired={field.required}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  } else if (field.type === 'SingleSelect') {
    return (
      <SingleSelect
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
        options={field.options ?? []}
      />
    );
  } else if (field.type === 'MultiSelect') {
    return (
      <MultiSelect
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
        options={field.options ?? []}
      />
    );
  } else if (field.type === 'Rating') {
    return <Rating editEnabled={editEnabled} onChange={onChange} maxVal={5} />;
  } else if (field.type === 'Checkbox') {
    return <Checkbox editEnabled={editEnabled} onChange={onChange} />;
  } else if (field.type === 'Date') {
    return <DateCell editEnabled={editEnabled} onChange={onChange} />;
  } else if (field.type === 'Currency') {
    return (
      <Currency
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
        currency="INR"
      />
    );
  } else if (field.type === 'Number') {
    return (
      <Number
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  } else if (field.type === 'Email') {
    return (
      <Email
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  } else if (field.type === 'URL') {
    return (
      <URLField
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  } else if (field.type === 'PhoneNumber') {
    return (
      <PhoneNumber
        placeholder={field.placeholder}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  } else if (field.type === 'Attachment') {
    return (
      <Text
        placeholder={field.placeholder}
        isRequired={field.required}
        editEnabled={editEnabled}
        onChange={onChange}
      />
    );
  }
};

export default Field;
