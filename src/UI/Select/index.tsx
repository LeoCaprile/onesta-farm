import { Options } from '@interfaces/select';
import React from 'react';

export interface SelectProps {
  title?: string;
  error?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Array<Options>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ title, name, error, disabled, options, onChange }, ref) => {
    function hasError() {
      if (error) {
        return 'focus:ring-[#D04435] focus:border-[#D04435] border-[#D04435] ';
      } else {
        return 'focus:ring-[#034BE5] focus:border-[#034BE5] border-[#E8E8E8] ';
      }
    }
    function isDisabled() {
      if (disabled) {
        return 'bg-[#F5F5F5] text-[#BDBDBD]';
      }
    }
    return (
      <div>
        {title && title}
        <select
          ref={ref}
          name={name}
          defaultValue=""
          onChange={onChange}
          disabled={disabled}
          className={
            'block w-full p-2 mb-6 text-sm border rounded-lg text-black bg-white ' +
            hasError() +
            isDisabled()
          }
        >
          <option value="" disabled hidden>
            Seleccionar
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
