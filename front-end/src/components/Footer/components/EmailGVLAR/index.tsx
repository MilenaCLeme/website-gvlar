import style from './emailGVLAR.module.scss';

const EmailGVLAR = () => {
  return (
    <a
      className={style.email}
      target='_blank'
      rel='noopener noreferrer'
      href='mailto:gvlar@gvlar.com.br'
    >
      <div />
      <span>gvlar@gvlar.com.br</span>
    </a>
  );
};

export default EmailGVLAR;
