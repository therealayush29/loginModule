import React from 'react';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder }) => {
  const inputClassNames = `p-2 rounded-xl border w-full ${type === 'email' ? 'mt-4' : ''}`;
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      required
      className={inputClassNames}
      placeholder={placeholder}
    />
  );
};

export default InputField;
