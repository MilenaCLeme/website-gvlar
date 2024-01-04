import Calendar from '@/assets/onlyOne/calendar.svg';
import style from './data.module.scss';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';
import { formatarData } from '@/functions/transformation';

registerLocale('pt-BR', ptBR);

interface DateCalendarProps {
  onChange: (dateSelect: Date | null) => void;
  selectedDate: null | Date;
}

const DateCalendar = ({ onChange, selectedDate }: DateCalendarProps) => {
  const today: Date = new Date();
  const tomorrow: Date = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className={style.custom}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat='dd/MM/yyyy' // Formato da data
        placeholderText='Selecione a data'
        showMonthDropdown
        showYearDropdown
        dropdownMode='scroll'
        customInput={
          <div>
            <Calendar />
          </div>
        }
        locale='pt-BR'
        minDate={tomorrow}
      />
      <div className={style['custom-date']}>
        {selectedDate && <p>{formatarData(selectedDate)}</p>}
      </div>
    </div>
  );
};

export default DateCalendar;
