import CheckedFalse from '@/assets/checkbox/checkedFalse.svg';
import CheckedTrue from '@/assets/checkbox/checkedTrue.svg';
import style from './radio.module.scss';
import { ChangeEvent } from 'react';

interface RadioProps {
  label: string;
  checked: boolean;
  onChange: (checked: string) => void;
}

const Radio: React.FC<RadioProps> = ({ label, checked, onChange }: RadioProps) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.value;
    console.log(event);
    onChange(newChecked);
  };
  return (
    <label className={style.radio_container}>
      <input
        className={style.radio_input}
        type='radio'
        value={label}
        checked={checked}
        onChange={handleRadioChange}
      />
      <span>{checked ? <CheckedTrue /> : <CheckedFalse />}</span>
      {label}
    </label>
  );
};

export default Radio;
