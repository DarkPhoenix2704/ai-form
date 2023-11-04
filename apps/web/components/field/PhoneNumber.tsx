interface PhoneNumberProps {
  value?: string;
  editEnabled: boolean;
  placeholder: string;
  onChange: (value: string) => void;
}

const PhoneNumber = ({
  value,
  editEnabled,
  onChange,
  placeholder,
}: PhoneNumberProps) => {
  return editEnabled ? (
    <input
      placeholder={placeholder}
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="tel"
      required={true}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

export default PhoneNumber;
