import Input from '@/components/Input';
import InputCheck from '@/components/InputCheck';
import InputSearch from '@/components/InputSearch';
import InputSelect from '@/components/InputSelect';
import Bathroom from '@/assets/bathroom/bathroom.svg';
import Footage from '@/assets/footage/footage.svg';
import Bedroom from '@/assets/bedroom/bedroom.svg';
import Garage from '@/assets/garage/garage.svg';
import ButtonIcon from '@/components/ButtonIcon';
import style from './formMobile.module.scss';
import GVLar from '@/assets/gvlar/logoWhite.svg';
import { FormEvent } from 'react';
import { FilterPageProperty } from '@/types';
import { disabledFilter } from '@/functions/disabled';

interface FormProps {
  filter: FilterPageProperty;
  handleFilterChange: (
    e: FormEvent<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>,
  ) => void;
  handleOnClick: () => void;
}

const Form: React.FC<FormProps> = ({ filter, handleFilterChange, handleOnClick }: FormProps) => {
  return (
    <div className={style.form}>
      <div className={style.image}>
        <GVLar />
      </div>
      <form className={style.box}>
        <div className={style['box-desk']}>
          <div className={style.type}>
            <InputCheck
              type='checkbox'
              label='Vender'
              title='business'
              value={
                filter.business === 'ambos'
                  ? 'aluguel'
                  : filter.business === 'aluguel'
                  ? 'ambos'
                  : filter.business === 'venda'
                  ? ''
                  : 'venda'
              }
              checked={filter.business === 'ambos' || filter.business === 'venda' ? true : false}
              onChange={handleFilterChange}
            />
            <InputCheck
              type='checkbox'
              label='Alugar'
              title='business'
              value={
                filter.business === 'ambos'
                  ? 'venda'
                  : filter.business === 'venda'
                  ? 'ambos'
                  : filter.business === 'aluguel'
                  ? ''
                  : 'aluguel'
              }
              checked={filter.business === 'ambos' || filter.business === 'aluguel' ? true : false}
              onChange={handleFilterChange}
            />
          </div>
          <div className={style.aboutandvalue}>
            <label className={style.about} htmlFor='property'>
              Tipo do imóvel
              <div className={style.margin}>
                <InputSelect
                  iten='property'
                  valeu={filter.about === undefined ? '' : filter.about}
                  handleChange={handleFilterChange}
                />
              </div>
            </label>
            <div className={style.value}>
              <Input
                label='Valor do imóvel'
                name='minV'
                placeholder='Min'
                value={filter.minV === undefined ? '' : filter.minV}
                mask='currency'
                onChange={handleFilterChange}
              />
              <Input
                type='text'
                name='maxV'
                placeholder='Max'
                value={filter.maxV === undefined ? '' : filter.maxV}
                mask='currency'
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
        <div className={style.search}>
          <label htmlFor='text'>
            <p>Localização</p>
            <InputSearch
              name='text'
              placeholder='busque aqui o seu imóvel'
              onChange={handleFilterChange}
              value={filter.text === undefined ? '' : filter.text}
            />
          </label>
        </div>
        <div className={style.grup}>
          <div>
            <div className={style.gruptitle}>
              <Bedroom />
              Quartos
            </div>
            <div className={style.grupchecked}>
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                label='01'
                value='01'
                title='bedroom'
                checked={filter.bedroom === 1}
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                label='02'
                value='02'
                title='bedroom'
                checked={filter.bedroom === 2}
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                label='03'
                value='03'
                title='bedroom'
                checked={filter.bedroom === 3}
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                label='4+'
                value='04'
                title='bedroom'
                checked={filter.bedroom === 4}
              />
            </div>
          </div>
          <div className={style.grupBath}>
            <div className={style.gruptitle}>
              <Bathroom />
              Banheiros
            </div>
            <div className={style.grupchecked}>
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='bathroom'
                value='01'
                checked={filter.bathroom === 1}
                label='01'
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='bathroom'
                value='02'
                checked={filter.bathroom === 2}
                label='02'
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='bathroom'
                value='03'
                checked={filter.bathroom === 3}
                label='03'
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='bathroom'
                value='04'
                checked={filter.bathroom === 4}
                label='4+'
              />
            </div>
          </div>
        </div>
        <div className={style.grup}>
          <div>
            <div className={style.gruptitle}>
              <Garage />
              Garagem
            </div>
            <div className={style.grupchecked}>
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='garage'
                value='01'
                checked={filter.garage === 1}
                label='01'
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='garage'
                value='02'
                checked={filter.garage === 2}
                label='02'
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='garage'
                value='03'
                checked={filter.garage === 3}
                label='03'
              />
              <InputCheck
                type='checkbox'
                onChange={handleFilterChange}
                title='garage'
                value='04'
                checked={filter.garage === 4}
                label='4+'
              />
            </div>
          </div>
          <div className={style.grupfootage}>
            <div className={style.gruptitle}>
              <Footage />
              Metragem
            </div>
            <div className={style.grupinput}>
              <Input
                type='number'
                name='minFoo'
                placeholder='Min'
                value={filter.minFoo === undefined ? '' : filter.minFoo}
                min={1}
                onChange={handleFilterChange}
              />
              <Input
                type='number'
                name='maxFoo'
                placeholder='Max'
                value={filter.maxFoo === undefined ? '' : filter.maxFoo}
                min={1}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
        <div className={style.button}>
          <ButtonIcon
            name='Buscar'
            disabled={disabledFilter(filter)}
            onClick={() => handleOnClick()}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
