import style from './cartClient.module.scss';

interface CardClientProps {
  image: string;
  text: string;
  instagram: string;
  clientRef: string;
}

const CardClient: React.FC<CardClientProps> = ({
  image,
  text,
  instagram,
  clientRef,
}: CardClientProps) => {
  return (
    <div className={style.cart}>
      <img className={style.image} src={image} alt='Uma foto na pessoa' />
      <div className={style.box}>
        <p>{text}</p>
        <a target='_black' rel='noopener' href={clientRef}>
          {instagram}
        </a>
      </div>
    </div>
  );
};

export default CardClient;
