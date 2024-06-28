import { InputHTMLAttributes } from 'react';
import './Input.css'

interface ReusableInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputType: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string
}

const ReusableInput: React.FC<ReusableInputProps> = ({ label, inputType, value, onChange, placeholder }) => {
  return (
    <div className="input-container">
      <label className='label'>{label}</label>
      <input className='input'
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default ReusableInput;
