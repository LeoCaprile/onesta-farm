import React from 'react';

export interface SelectProps {
  title?: string;
  error?: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ title, error, disabled, onChange }: SelectProps) => {
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
        onChange={onChange}
        disabled={disabled}
        className={
          'block w-full p-2 mb-6 text-sm border rounded-lg text-black bg-white ' +
          hasError() +
          isDisabled()
        }
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>
    </div>
  );
};

export default Select;
