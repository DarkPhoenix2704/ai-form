interface LongTextProps {
  editEnabled: boolean;
  value: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
}

const LongText = ({
  editEnabled,
  value,
  isRequired,
  onChange,
}: LongTextProps) => {
  return editEnabled ? (
    <textarea
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      required={isRequired}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

export default LongText;
