interface UrlProps {
  placeholder: string;
  value?: string;
  editEnabled: boolean;
  onChange: (value: string) => void;
}

const URLField = ({ value, placeholder, editEnabled, onChange }: UrlProps) => {
  return editEnabled ? (
    <input
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="url"
      required={true}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ) : (
    <span>{value}</span>
  );
};

export default URLField;
