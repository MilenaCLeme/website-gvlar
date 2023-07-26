import Woman from '@/img/home/black woman.png';
import style from './cardClient.module.scss';

const CardClient = () => {
  return (
    <div className={style.contanier}>
      <img src={Woman} alt='mulher' />
      <div className={style.contanier__card}>
        <p>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum."`}
        </p>
        <span>@Lorem Ipsum</span>
      </div>
    </div>
  );
};

export default CardClient;
