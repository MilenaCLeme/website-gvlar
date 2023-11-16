import Input from '../Input';
import InputCheck from '../InputCheck';
import InputSelect from '../InputSelect';
import style from './formProperty.module.scss';
import Footage from '@/assets/footage/footageOrange.svg';
import Garage from '@/assets/garage/garageOrange.svg';
import Bedroom from '@/assets/bedroom/bedroomOrange.svg';
import Bathroom from '@/assets/bathroom/bathroomOrange.svg';
import { Property } from '@/types';
import { FormEvent } from 'react';

interface FormProperty {
  property: Property;
  handlePropertyChange: (
    e: FormEvent<HTMLInputElement | HTMLButtonElement | HTMLTextAreaElement>,
  ) => void;
}

const FormProperty: React.FC<FormProperty> = ({ property, handlePropertyChange }: FormProperty) => {
  return (
    <form className={style.form}>
      <div className={style.box_title}>
        <p>
          ID: <span>{property.id}</span>
        </p>
        <h1>Informações do imóvel</h1>
      </div>
      <h2 className={style.subtitle}>Tipo de imóvel</h2>
      <div className={style.about}>
        <InputCheck
          type='checkbox'
          label='Vender'
          value={
            property.business === 'ambos'
              ? 'aluguel'
              : property.business === 'aluguel'
              ? 'ambos'
              : property.business === 'venda'
              ? ''
              : 'venda'
          }
          checked={property.business === 'ambos' || property.business === 'venda' ? true : false}
          onChange={handlePropertyChange}
        />
        <InputCheck
          type='checkbox'
          label='Alugar'
          value={
            property.business === 'ambos'
              ? 'venda'
              : property.business === 'venda'
              ? 'ambos'
              : property.business === 'aluguel'
              ? ''
              : 'aluguel'
          }
          checked={property.business === 'ambos' || property.business === 'aluguel' ? true : false}
          className={style.margin}
          onChange={handlePropertyChange}
        />
        <InputSelect
          iten='property'
          valeu={property.about === undefined ? '' : property.about}
          handleChange={handlePropertyChange}
        />
      </div>
      <h2 className={style.subtitle}>Endereço</h2>
      <div className={style.box}>
        <div className={style.flex}>
          <Input
            type='text'
            name='zipcode'
            label='CEP*'
            value={property.zipcode === undefined ? '' : property.zipcode}
            onChange={handlePropertyChange}
            mask='cep'
            placeholder='00000-000'
            className={style.one}
          />
          <Input
            type='text'
            name='city'
            label='Cidade*'
            value={property.city === undefined ? '' : property.city}
            className={style.two}
            onChange={handlePropertyChange}
            disabled={true}
          />
          <Input
            type='text'
            name='state'
            label='Estado*'
            value={property.state === undefined ? '' : property.state}
            className={style.three}
            onChange={handlePropertyChange}
            disabled={true}
          />
        </div>
        <div className={style.flex}>
          <Input
            type='text'
            className={style.one}
            name='zone'
            label='Zona'
            onChange={handlePropertyChange}
            value={
              property.zone === null || property.zone === undefined || property.zone === undefined
                ? ''
                : property.zone
            }
          />
          <Input
            type='text'
            name='address'
            className={style.address}
            label='Logradouro*'
            onChange={handlePropertyChange}
            value={property.address === undefined ? '' : property.address}
            disabled={true}
          />
        </div>
        <div className={style.flex}>
          <Input
            type='text'
            label='Numero*'
            name='number'
            className={style.one}
            onChange={handlePropertyChange}
            value={property.number === undefined ? '' : property.number}
          />
          <Input
            type='text'
            label='Complemento'
            name='complement'
            value={
              property.complement === null || property.complement === undefined
                ? ''
                : property.complement
            }
            className={style.two}
            onChange={handlePropertyChange}
          />
          <Input
            type='text'
            label='Bairro*'
            name='area'
            className={style.three}
            value={property.area === undefined ? '' : property.area}
            onChange={handlePropertyChange}
            disabled={true}
          />
        </div>
      </div>
      <h2 className={style.subtitle}>Descrição</h2>
      <textarea
        name='description'
        className={style.textarea}
        value={property.description === undefined ? '' : property.description}
        onChange={handlePropertyChange}
      />
      <h2 className={style.subtitle}>Valores</h2>
      <div className={style.box_currency}>
        <Input
          name='sell'
          className={style.currency_one}
          label='Valor de venda'
          placeholder='R$ 0,00'
          disabled={
            property.business === null ||
            property.business === undefined ||
            property.business === '' ||
            property.business === 'aluguel'
          }
          mask='currency'
          value={property.sell === null || property.sell === undefined ? '' : property.sell}
          onChange={handlePropertyChange}
        />
        <Input
          name='rental'
          label='Valor de Aluguel'
          className={style.currency_one}
          placeholder='R$ 0,00'
          disabled={
            property.business === null ||
            property.business === undefined ||
            property.business === '' ||
            property.business === 'venda'
          }
          mask='currency'
          value={property.rental === null || property.rental === undefined ? '' : property.rental}
          onChange={handlePropertyChange}
        />
        <Input
          label='Valor de IPTU*'
          className={style.currency_two}
          placeholder='R$ 0,00'
          mask='currency'
          name='iptu'
          value={property.iptu === undefined ? '' : property.iptu}
          onChange={handlePropertyChange}
        />
      </div>
      <h2 className={style.subtitle}>Atributos</h2>
      <div className={style.flex}>
        <div className={style.box_icons}>
          <div>
            <Footage />
            <h3>Metragem</h3>
          </div>
          <div>
            <Input
              type='number'
              name='footage'
              min={0}
              value={property.footage === undefined ? '' : property.footage}
              onChange={handlePropertyChange}
            />
            <p>M²</p>
          </div>
        </div>
        <div className={style.box_icons}>
          <div>
            <Garage />
            <h3>Garagem</h3>
          </div>
          <div>
            <Input
              type='number'
              name='garage'
              value={property.garage === undefined ? '' : property.garage}
              min={0}
              onChange={handlePropertyChange}
            />
            <p>Vagas</p>
          </div>
        </div>
        <div className={style.box_icons}>
          <div>
            <Bedroom />
            <h3>Quartos</h3>
          </div>
          <div>
            <Input
              type='number'
              name='bedroom'
              min={0}
              value={property.bedroom === undefined ? '' : property.bedroom}
              onChange={handlePropertyChange}
            />
            <p>Quartos</p>
          </div>
        </div>
        <div className={style.box_icons}>
          <div>
            <Bathroom />
            <h3>Banheiros</h3>
          </div>
          <div>
            <Input
              type='number'
              name='bathroom'
              min={0}
              value={property.bathroom === undefined ? '' : property.bathroom}
              onChange={handlePropertyChange}
            />
            <p>Banheiros</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormProperty;
