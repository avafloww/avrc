import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  icon?: IconProp;
  label?: string;
  className?: string;
  onClick?: () => void;
};

/**
 * A button component that supports a FontAwesomeIcon as well as a text label.
 */
export default function Button({ icon, label, className, onClick, ...props }: ButtonProps) {
  const ElementType = (props.href ? <a /> : <button />).type;

  return (
    <ElementType
      className={`flex items-center justify-center px-3 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {label && <span className={icon ? 'ml-2' : ''}>{label}</span>}
    </ElementType>
  );
}
