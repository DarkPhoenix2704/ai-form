interface PhoneNumberProps {
  value: string;
  editEnabled: boolean;
  onChange: (value: string) => void;
}

const PhoneNumber = ({ value, editEnabled, onChange }: PhoneNumberProps) => {
  return editEnabled ? (
    <input
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
