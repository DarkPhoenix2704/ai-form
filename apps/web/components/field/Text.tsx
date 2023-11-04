interface TextProps {
  editEnabled: boolean;
  placeholder: string;
  value?: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
}

const Text = ({
  value,
  placeholder,
  isRequired = false,
  onChange = () => {},
  editEnabled = false,
}: TextProps) => {
  return editEnabled ? (
    <input
      placeholder={placeholder}
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="text"
      required={isRequired}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

export default Text;
