import Select from "react-select";

interface SingleSelectProps {
  editEnabled: boolean;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SingleSelect = ({
  editEnabled,
  value,
  onChange,
  options,
}: SingleSelectProps) => {
  return editEnabled ? (
    <Select
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

export default SingleSelect;
