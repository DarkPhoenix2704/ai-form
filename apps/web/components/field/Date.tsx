import { format } from 'date-fns';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import * as Popover from '@radix-ui/react-popover';

interface DateCellProps {
  editEnabled: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const DateCell = ({ editEnabled, value, onChange }: DateCellProps) => {
  return editEnabled ? (
    <Popover.Root>
      <Popover.Trigger className="focus-visible:outline-none">
        <div
          tabIndex={0}
          className="border-2 px-2 text-left py-1 w-[12.5rem] border-gray-300 hover:border-[#bfbfbf] rounded-md focus:border-blue-500"
        >
          {format(new Date(value ?? ''), 'dd MMM yyyy')}
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-white shadow-md rounded-md">
          <DayPicker
            mode="single"
            selected={new Date(value ?? '')}
            onDayClick={(day) => {
              onChange(day.toISOString());
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  ) : (
    <div>{format(new Date(value ?? ''), 'dd MMM yyyy')}</div>
  );
};

export default DateCell;
