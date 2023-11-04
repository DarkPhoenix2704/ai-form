import Select from 'react-select';

interface MultiSelectProps {
  placeholder: string;
  editEnabled: boolean;
  value?: string[];
  options: string[];
  onChange: (value: string) => void;
}

const MultiSelect = ({
  placeholder,
  editEnabled,
  value,
  onChange,
  options,
}: MultiSelectProps) => {
  return editEnabled ? (
    <Select
      isMulti
      placeholder={placeholder}
      className="w-[12.5rem] border-2 rounded-md"
      closeMenuOnScroll
      closeMenuOnSelect
      onChange={(e) => onChange((e && typeof e === 'object' ? e : []) ?? [])}
      options={options.map((option) => ({ value: option, label: option }))}
    />
  ) : (
    <span>{value}</span>
  );
};

export default MultiSelect;
