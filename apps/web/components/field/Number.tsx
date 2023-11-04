interface NumberProps {
  editEnabled: boolean;
  value: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
}

const Number = ({
  value,
  isRequired = false,
  onChange = () => {},
  editEnabled = false,
}: NumberProps) => {
  return editEnabled ? (
    <input
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="number"
      required={isRequired}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

export default Number;
