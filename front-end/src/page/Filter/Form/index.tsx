import { useState } from 'react';
import CheckBox from '@/components/CheckBox';
import MagnifyingGlass from '@/assets/iconsAll/magnifyingGlass/magnifyingGlassColor.svg';
import Bed from '@/assets/iconsAll/bed/bed.svg';
import Radio from '@/components/Radio';
import Bathtub from '@/assets/iconsAll/bathtub/bathtub.svg';
import Car from '@/assets/iconsAll/car/car.svg';
import Footage from '@/assets/iconsAll/footage.svg';
import style from './form.module.scss';
import GVLar from '@/assets/filter/logogvlarwhite.svg';

const Form = () => {
  const [rental, setRental] = useState<boolean>(false);
  const [sell, setSell] = useState<boolean>(false);
  const [bedroom, setBedroom] = useState<string>('0');
  const [bathroom, setBathroom] = useState<string>('0');
  const [garage, setGarage] = useState<string>('0');

  return (
    <div className={style.container}>
      <form className={style.container_form}>
        <div className={style.container_form__frist}>
          <label className={style.container_form__frist__select__label} htmlFor='type'>
            Tipe do Imóvel
            <select className={style.container_form__frist__select} name='type' id='type'>
              <option value='Apartamento'>Apartamento</option>
              <option value='Casa Térrea'>Casa Térrea</option>
              <option value='Sobrado'>Sobrado</option>
              <option value='Galpão'>Galpão</option>
              <option value='Terreno'>Terreno</option>
            </select>
          </label>
          <div className={style.container_form__frist__checkbox}>
            <CheckBox label='Comprar' checked={sell} onChange={setSell} />
            <CheckBox label='Alugar' checked={rental} onChange={setRental} />
          </div>
          <div className={style.container_form__frist__value}>
            Valor do imóvel
            <div className={style.container_form__frist__value__inputs}>
              <label>
                <input type='text' placeholder='Min' />
              </label>
              <label>
                <input type='text' placeholder='Max' />
              </label>
            </div>
          </div>
        </div>
        <label className={style.container_form__input}>
          Endereço, Bairro, Região...
          <div className={style.container_form__input__text}>
            <MagnifyingGlass />
            <input type='text' name='search' id='search' placeholder='Referências' />
          </div>
        </label>
        <div className={style.container_form__box}>
          <div className={style.container_form__box__margin}>
            <div className={style.container_form__box__title}>
              <Bed />
              Quartos
            </div>
            <div className={style.container_form__box__radio}>
              <Radio label='1' checked={bedroom === '1'} onChange={setBedroom} />
              <Radio label='2' checked={bedroom === '2'} onChange={setBedroom} />
              <Radio label='3' checked={bedroom === '3'} onChange={setBedroom} />
              <Radio label='4+' checked={bedroom === '4+'} onChange={setBedroom} />
            </div>
          </div>
          <div>
            <div className={style.container_form__box__title}>
              <Bathtub />
              Banheiros
            </div>
            <div className={style.container_form__box__radio}>
              <Radio label='1' checked={bathroom === '1'} onChange={setBathroom} />
              <Radio label='2' checked={bathroom === '2'} onChange={setBathroom} />
              <Radio label='3' checked={bathroom === '3'} onChange={setBathroom} />
              <Radio label='4+' checked={bathroom === '4+'} onChange={setBathroom} />
            </div>
          </div>
        </div>
        <div className={style.container_form__box}>
          <div className={style.container_form__box__margin}>
            <div className={style.container_form__box__titlebig}>
              <Car />
              Vaga de garagem
            </div>
            <div className={style.container_form__box__radio}>
              <Radio label='1' checked={garage === '1'} onChange={setGarage} />
              <Radio label='2' checked={garage === '2'} onChange={setGarage} />
              <Radio label='3' checked={garage === '3'} onChange={setGarage} />
              <Radio label='4+' checked={garage === '4+'} onChange={setGarage} />
            </div>
          </div>
          <div>
            <div className={style.container_form__box__titlebigtwo}>
              <Footage />
              Metragem do imóvel
            </div>
            <div className={style.container_form__box__inputs}>
              <label>
                <input type='text' placeholder='Min' />
              </label>
              <label>
                <input type='text' placeholder='Max' />
              </label>
            </div>
          </div>
        </div>
        <button className={style.container_form__button}>
          Buscar
          <div className={style.container_form__button__svg} />
        </button>
      </form>
      <div className={style.container_img}>
        <GVLar />
      </div>
    </div>
  );
};

export default Form;
