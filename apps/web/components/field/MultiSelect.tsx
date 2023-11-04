import Select from "react-select";

interface MultiSelectProps {
  editEnabled: boolean;
  value: string[];
  options: string[];
  onChange: (value: string) => void;
}

const MultiSelect = ({
  editEnabled,
  value,
  onChange,
  options,
}: MultiSelectProps) => {
  return editEnabled ? (
    <Select
      isMulti
      className="w-[12.5rem] border-2 rounded-md"
      closeMenuOnScroll
      closeMenuOnSelect
      onChange={(e) => onChange((e && typeof e === "object" && e.value) ?? "")}
      options={options.map((option) => ({ value: option, label: option }))}
    />
  ) : (
    <span>{value}</span>
  );
};

export default MultiSelect;
