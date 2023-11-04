interface RatingProps {
  value?: number;
  maxVal: number;
  editEnabled: boolean;
  onChange: (value: number) => void;
}

const Rating = ({ value = 1, maxVal, editEnabled, onChange }: RatingProps) => {
  return (
    <div className="flex gap-1 border-2 px-2 py-1 w-[12.5rem] border-gray-300 hover:border-[#bfbfbf] rounded-md focus:border-blue-500">
      {Array.from(Array(maxVal).keys()).map((i) => (
        <span
          key={i}
          className={` transition-all hover:text-yellow-500 ${
            i < value ? 'text-yellow-500' : 'text-gray-300'
          } ${editEnabled ? ' cursor-pointer' : ''}`}
          onClick={() => {
            if (editEnabled) {
              onChange(i + 1);
            }
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
