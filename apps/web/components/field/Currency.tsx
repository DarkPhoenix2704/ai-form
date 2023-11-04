interface CurrencyProps {
  editEnabled: boolean;
  value: string;
  currency: string;
  isRequired?: boolean;
  onChange: (value: string) => void;
}

const Currency = ({
  value,
  currency,
  isRequired = false,
  onChange = () => {},
  editEnabled = false,
}: CurrencyProps) => {
  return editEnabled ? (
    <input
      className="border-2 border-gray-300 hover:border-[#bfbfbf] focus:outline-blue-500 px-2 py-1 rounded-md"
      type="string"
      required={isRequired}
      value={currency + value}
      onChange={(e) => onChange(e.target.value.replaceAll(currency, ""))}
    />
  ) : (
    <span>{value}</span>
  );
};

export default Currency;
