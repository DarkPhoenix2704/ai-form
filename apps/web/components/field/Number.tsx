interface NumberProps {
  placeholder: string;
  editEnabled: boolean;
  value?: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
}

const Number = ({
  value,
  placeholder,
  isRequired = false,
  onChange = () => {},
  editEnabled = false,
}: NumberProps) => {
  return editEnabled ? (
    <input
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="number"
      placeholder={placeholder}
      required={isRequired}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

export default Number;
