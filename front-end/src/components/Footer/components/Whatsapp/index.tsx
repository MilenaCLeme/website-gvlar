import style from './whatsapp.module.scss';

const Whatsapp = () => {
  return (
    <a
      className={style.whatsapp}
      target='_blank'
      rel='noopener noreferrer'
      href='https://api.whatsapp.com/send/?phone=5511940020947&text&type=phone_number&app_absent=0'
    >
      <div />
      <p>
        (11) 94002-0947
        <span>Vania Leme</span>
      </p>
    </a>
  );
};

export default Whatsapp;
