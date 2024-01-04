import InputSelect from '@/components/InputSelect';
import style from './banner.module.scss';
import InputCheck from '@/components/InputCheck';
import InputSearch from '@/components/InputSearch';
import ButtonIcon from '@/components/ButtonIcon';
import videoMobile from '@/video/gvlarMobile.mp4';
import videoDesk from '@/video/gvlarDesk.mp4';
import GVlar from '@/assets/gvlar/logoWhite.svg';
import classNames from 'classnames';

const Banner = () => {
  return (
    <section className={style.banner}>
      <video
        className={classNames({ [style['video']]: true, [style.one]: true })}
        autoPlay
        muted
        loop
      >
        <source src={videoMobile} type='video/mp4' />
        Seu navegador não suporta a reprodução de vídeos.
      </video>
      <video
        className={classNames({ [style['video']]: true, [style.two]: true })}
        autoPlay
        muted
        loop
      >
        <source src={videoDesk} type='video/mp4' />
        Seu navegador não suporta a reprodução de vídeos.
      </video>
      <div className={style.content}>
        <div className={style.title}>
          <GVlar />
          <h1>Aqui os seus sonhos ganham um novo lar!</h1>
          <p>Seja para investir, morar ou trabalhar. Aqui você encontra!</p>
        </div>
        <form className={style.form}>
          <div className={style.party}>
            <InputSelect iten='property' valeu='' handleChange={() => console.log('oi')} />
            <div className={style['box-check']}>
              <InputCheck className={style.check} label='comprar' checked={false} />
              <InputCheck className={style.check} label='alugar' checked={false} />
            </div>
          </div>
          <InputSearch placeholder='busque aqui o seu imóvel' />
          <ButtonIcon name='Buscar' onClick={() => console.log('oii')} />
        </form>
      </div>
    </section>
  );
};

export default Banner;
