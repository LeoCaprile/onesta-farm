import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'link';
  size?: 'normal' | 'large';
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  size,
  type,
  disabled,
  icon,
  loading,
  onClick,
  htmlType = 'button',
}: ButtonProps) => {
  function defineClassName() {
    const disableButton = disabled;

    switch (type) {
      case 'primary':
        if (disableButton) return 'bg-[#E8E8E8] text-[#858585] ';
        return 'bg-[#034BE5] text-white ';
      case 'secondary':
        if (disableButton)
          return 'border-[#E8E8E8] dark:text-[#858585] border-[1px] bg-transparent text-[#858585] rounded-lg bg-transparent ';
        return 'border-[#034BE5] border-[1px] bg-transparent text-black rounded-lg bg-transparent ';
      case 'link':
        if (disableButton) return 'text-[#858585] bg-transparent underline ';
        return 'text-[#034BE5] bg-transparent underline ';
      default:
        if (disableButton) return 'bg-[#E8E8E8] text-[#858585] ';
        return 'bg-[#034BE5] text-white ';
    }
  }

  function onlyLoader() {
    if (children) return 'mr-[10px]';
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
    <div>
      <button
        type={htmlType}
        onClick={onClick}
        disabled={disabled}
        className={
          'font-bold rounded-[100px] ' + defineClassName() + defineSize()
        }
      >
        {loading && !icon && (
          <div className="flex items-center justify-center">
            <div
              className={
                'rounded-full border-b-transparent animate-spin border-white h-4 w-4 border-2 ' +
                onlyLoader()
              }
            />
            {children}
          </div>
        )}
        {icon && (
          <div className="flex">
            {loading && (
              <div
                className={
                  'rounded-full border-b-transparent animate-spin border-white h-4 w-4 border-2 ' +
                  onlyLoader()
                }
              />
            )}
            <div className="mr-[10px]">{icon}</div>
            {children}
          </div>
        )}
        {children && !icon && !loading ? children : null}
      </button>
    </div>
  );
};

export default Button;
