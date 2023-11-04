import Select from 'react-select';

interface SingleSelectProps {
  editEnabled: boolean;
  placeholder: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
}

const SingleSelect = ({
  editEnabled,
  value,
  placeholder,
  onChange,
  options,
}: SingleSelectProps) => {
  return editEnabled ? (
    <Select
      placeholder={placeholder}
      className="w-[12.5rem] border-2 rounded-md"
      closeMenuOnScroll
      closeMenuOnSelect
      onChange={(e) =>
        onChange((e && typeof e === 'object' ? e.value : '') ?? '')
      }
      options={options.map((option) => ({ value: option, label: option }))}
    />
  ) : (
    <span>{value}</span>
  );
};

export default SingleSelect;
