import { type InputHTMLAttributes, useCallback, useState } from 'react';
import { debounce } from '~/utils/debounce';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type: string;
  initError?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | undefined;
  className?: string;
};

export default function TextField({
  label,
  name,
  type,
  initError,
  onChange,
  validate,
  className,
  ...props
}: TextFieldProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | undefined>(initError);
  const validateField = useCallback(() => {
    if (validate) {
      const errorMsg = validate(text);
      setError(errorMsg);
    }
  }, [text, validate]);

  const updateField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      validateField();

      if (onChange) {
        debounce(onChange, 50)(e);
      }
    },
    [onChange, validateField],
  );

  return (
    <div className={`flex flex-col ${className}`}>
      <input
        id={name}
        name={name}
        type={type}
        onChange={updateField}
        onBlur={validateField}
        placeholder={label}
        aria-label={label}
        aria-invalid={!!error}
        aria-errormessage={error ? `${name}-error` : undefined}
        className={`border border-gray-300 rounded-md py-2 px-4 ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
