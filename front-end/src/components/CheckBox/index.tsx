import CheckedFalse from '@/assets/checkbox/checkedFalse.svg';
import CheckedTrue from '@/assets/checkbox/checkedTrue.svg';
import style from './checkBox.module.scss';
import { ChangeEvent, ReactNode } from 'react';

interface CheckBoxProps {
  label: string | ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }: CheckBoxProps) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    onChange(newChecked);
  };
  return (
    <label className={style.checkbox_container}>
      <input
        className={style.checkbox_input}
        type='checkbox'
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span>{checked ? <CheckedTrue /> : <CheckedFalse />}</span>
      {label}
    </label>
  );
};

CheckBox.propTypes = {};

export default CheckBox;
