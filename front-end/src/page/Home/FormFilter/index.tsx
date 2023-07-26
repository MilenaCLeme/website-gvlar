import CheckBox from '@/components/CheckBox';
import style from './formFilter.module.scss';
import MagnifyingGlass from '@/assets/iconsAll/magnifyingGlass/magnifyingGlassColor.svg';
import { useState } from 'react';

const FormFilter = () => {
  const [rental, setRental] = useState<boolean>(false);
  const [sell, setSell] = useState<boolean>(false);

  return (
    <form className={style.form}>
      <select className={style.select_input} name='type' id='type'>
        <option value='' hidden>
          Imóvel
        </option>
        <option value='Apartamento'>Apartamento</option>
        <option value='Casa Térrea'>Casa Térrea</option>
        <option value='Sobrado'>Sobrado</option>
        <option value='Galpão'>Galpão</option>
        <option value='Terreno'>Terreno</option>
      </select>
      <label className={style.text_input} htmlFor='search'>
        <MagnifyingGlass />
        <input type='text' name='search' id='search' placeholder='Busque aqui o seu imóvel' />
      </label>
      <div className={style.container_checks}>
        <CheckBox label='Quero alugar' checked={rental} onChange={setRental} />
        <CheckBox label='Quero comprar' checked={sell} onChange={setSell} />
      </div>
      <button className={style.button_submit}>
        Buscar
        <div className={style.button_submit__svg} />
      </button>
    </form>
  );
};

export default FormFilter;
