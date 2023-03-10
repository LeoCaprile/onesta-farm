import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type?: 'primary' | 'secondary' | 'link';
  size?: 'normal' | 'large';
  icon?: ReactNode;
  disabled?: boolean;
}

const Button = ({ children, size, type, disabled, icon }: Props) => {
  function defineClassName() {
    switch (type) {
      case 'primary':
        if (disabled) return 'bg-[#E8E8E8] text-[#858585] ';
        return 'bg-[#034BE5] text-white ';
      case 'secondary':
        if (disabled)
          return 'border-[#E8E8E8] dark:text-[#858585] border-[1px] bg-transparent text-[#858585] rounded-lg bg-transparent ';
        return 'border-[#034BE5] dark:text-white border-[1px] bg-transparent text-black rounded-lg bg-transparent ';
      case 'link':
        if (disabled) return 'text-[#858585] bg-transparent underline ';
        return 'text-[#034BE5] bg-transparent underline ';
      default:
        if (disabled) return 'bg-[#E8E8E8] text-[#858585] ';
        return 'bg-[#034BE5] text-white ';
    }
  }

  function defineSize() {
    switch (size) {
      case 'large':
        return 'px-6 py-[10px] text-lg';
      default:
        return 'px-4 py-2  text-sm';
    }
  }
  return (
    <button
      className={
        'font-bold rounded-[100px] ' + defineClassName() + defineSize()
      }
    >
      {icon ? (
        <div className="flex">
          <div className="mr-[10px]">{icon}</div>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
