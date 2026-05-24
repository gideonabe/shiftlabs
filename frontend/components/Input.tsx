import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3
            bg-white border-2 border-neutral-200
            rounded-lg
            text-foreground placeholder-neutral-400
            transition-colors duration-200
            focus:border-primary-500 focus:outline-none
            disabled:bg-neutral-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error ? 'border-error focus:border-error' : ''}
            ${className || ''}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-neutral-500 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helperText,
  showCount,
  className,
  value,
  maxLength,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        maxLength={maxLength}
        className={`
          w-full px-4 py-3
          bg-white border-2 border-neutral-200
          rounded-lg
          text-foreground placeholder-neutral-400
          transition-colors duration-200
          focus:border-primary-500 focus:outline-none
          disabled:bg-neutral-50 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-error focus:border-error' : ''}
          ${className || ''}
        `}
        {...props}
      />
      <div className="flex justify-between items-start mt-1">
        <div>
          {error && <p className="text-error text-sm">{error}</p>}
          {helperText && !error && (
            <p className="text-neutral-500 text-sm">{helperText}</p>
          )}
        </div>
        {showCount && maxLength && (
          <p className="text-neutral-500 text-sm">
            {String(value).length || 0} / {maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3
          bg-white border-2 border-neutral-200
          rounded-lg
          text-foreground
          transition-colors duration-200
          focus:border-primary-500 focus:outline-none
          disabled:bg-neutral-50 disabled:cursor-not-allowed
          ${error ? 'border-error focus:border-error' : ''}
          ${className || ''}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};
