interface CheckboxProps {
  editEnabled: boolean;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <input
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="checkbox"
      disabled={!props.editEnabled}
      checked={props.value}
      onChange={(e) => props.onChange(e.target.checked)}
    />
  );
};

export default Checkbox;
