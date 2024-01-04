import style from './address.module.scss';

const Address = () => {
  return (
    <a
      className={style.address}
      target='_blank'
      rel='noopener noreferrer'
      href='https://goo.gl/maps/3BypkpUKTgFVkU4YA'
    >
      <div />
      <span>R. Cuiabá, 797 - Alto da Mooca - São Paulo/SP</span>
    </a>
  );
};

export default Address;
