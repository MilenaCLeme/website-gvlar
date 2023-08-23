import style from './clock.module.scss';

const Clock = () => {
  return (
    <div className={style.clock}>
      <div />
      <p>Segunda a Sexta das 09h às 18h</p>
    </div>
  );
};

export default Clock;
